create type level as enum ('DEBUTANT','INTERMEDIAIRE','AVANCE');
create type city as enum ('BORDEAUX','TOULOUSE','MONTPELLIER');
create type visibility as enum ('PUBLIC','PRIVATE');

-- profiles
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  level level not null default 'DEBUTANT',
  city city not null default 'BORDEAUX',
  prefers_indoor boolean not null default true,
  prefers_outdoor boolean not null default true,
  is_premium boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
create policy if not exists "profiles_select_all" on public.profiles for select using (true);
create policy if not exists "profiles_update_own" on public.profiles for update using (auth.uid() = id);
create or replace function public.touch_updated_at() returns trigger as $$
begin new.updated_at = now(); return new; end; $$ language plpgsql;
drop trigger if exists profiles_touch on public.profiles;
create trigger profiles_touch before update on public.profiles
for each row execute procedure public.touch_updated_at();

-- clubs
create table if not exists public.clubs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  city city not null,
  indoor boolean not null,
  courts int not null check (courts > 0),
  price_per_hour numeric(6,2) not null check (price_per_hour > 0),
  rating numeric(2,1) not null check (rating between 0 and 5),
  created_at timestamptz not null default now()
);
alter table public.clubs enable row level security;
create policy if not exists "clubs_select_all" on public.clubs for select using (true);

-- matches
create table if not exists public.matches (
  id uuid primary key default gen_random_uuid(),
  club_id uuid not null references public.clubs(id) on delete cascade,
  owner_id uuid not null references public.profiles(id) on delete cascade,
  date date not null,
  start_time time not null,
  duration_minutes int not null check (duration_minutes in (60,90)),
  level_min level not null,
  level_max level not null,
  visibility visibility not null default 'PUBLIC',
  note text,
  created_at timestamptz not null default now()
);
alter table public.matches enable row level security;
create policy if not exists "matches_select_public" on public.matches for select using (visibility = 'PUBLIC');
create policy if not exists "matches_select_private_members" on public.matches for select using (
  exists (select 1 from public.match_players mp where mp.match_id = id and mp.profile_id = auth.uid())
  or owner_id = auth.uid()
);
create policy if not exists "matches_cud_auth" on public.matches for all using (auth.uid() is not null) with check (auth.uid() is not null);

-- match_players
create table if not exists public.match_players (
  match_id uuid not null references public.matches(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  joined_at timestamptz not null default now(),
  primary key (match_id, profile_id)
);
alter table public.match_players enable row level security;
create policy if not exists "match_players_select_member" on public.match_players for select using (
  profile_id = auth.uid()
  or exists (select 1 from public.matches m where m.id = match_id and (m.owner_id = auth.uid()))
);
create policy if not exists "match_players_join_self" on public.match_players for insert with check (profile_id = auth.uid());
create policy if not exists "match_players_leave_self" on public.match_players for delete using (profile_id = auth.uid());

-- bookings
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  club_id uuid not null references public.clubs(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  date date not null,
  start_time time not null,
  duration_minutes int not null check (duration_minutes in (60,90)),
  created_at timestamptz not null default now(),
  unique (club_id, date, start_time)
);
alter table public.bookings enable row level security;
create policy if not exists "bookings_select_own" on public.bookings for select using (profile_id = auth.uid() or auth.uid() is not null);
create policy if not exists "bookings_cud_own" on public.bookings for all using (profile_id = auth.uid()) with check (profile_id = auth.uid());

-- threads & messages
create table if not exists public.threads (
  id uuid primary key default gen_random_uuid(),
  match_id uuid references public.matches(id) on delete cascade,
  is_dm boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.threads enable row level security;
create policy if not exists "threads_select_member" on public.threads for select using (
  exists (select 1 from public.thread_members tm where tm.thread_id = id and tm.profile_id = auth.uid())
);
create policy if not exists "threads_insert_auth" on public.threads for insert with check (auth.uid() is not null);

create table if not exists public.thread_members (
  thread_id uuid not null references public.threads(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  primary key (thread_id, profile_id)
);
alter table public.thread_members enable row level security;
create policy if not exists "thread_members_select_own" on public.thread_members for select using (profile_id = auth.uid());
create policy if not exists "thread_members_insert_self" on public.thread_members for insert with check (profile_id = auth.uid());

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references public.threads(id) on delete cascade,
  author_id uuid not null references public.profiles(id) on delete cascade,
  content text not null,
  created_at timestamptz not null default now()
);
alter table public.messages enable row level security;
create policy if not exists "messages_select_member" on public.messages for select using (
  exists (select 1 from public.thread_members tm where tm.thread_id = messages.thread_id and tm.profile_id = auth.uid())
);
create policy if not exists "messages_insert_self" on public.messages for insert with check (author_id = auth.uid());
