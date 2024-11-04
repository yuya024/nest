-- Custom SQL migration file, put you code below! --

create or replace function public.handle_new_profile()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, name, created_at, updated_at)
  values (new.id, 'guest', now(), now());
  return new;  
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_profile();