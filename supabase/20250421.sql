-- プロフィールテーブルの作成
create table profiles (
    id uuid references auth.users on delete cascade not null primary key,
    username text unique,
    display_name text,
    icon_color text default '#7fffd4',
    bio text,
    website text,
    updated_at timestamp with time zone,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 投稿テーブルの作成
create table posts (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references auth.users on delete cascade not null,
    content text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    likes_count integer default 0,
    comments_count integer default 0
);

-- RLS（Row Level Security）ポリシーの設定

-- profilesテーブルに対するRLSを有効にする
alter table profiles enable row level security;

-- postsテーブルに対するRLSを有効にする
alter table posts enable row level security;

-- 新規ユーザー登録時にプロファイルを作成可能にする
create policy "Enable insert for new users signing up"
    on profiles for insert
    with check (true);

-- profilesテーブルのポリシー

-- 全てのユーザーがプロファイル情報を閲覧可能
create policy "Users can view all profiles"
    on profiles for select
    using ( true );

-- ユーザーが自分のプロファイルを更新可能
create policy "Users can update own profile"
    on profiles for update
    using ( auth.uid() = id );

-- postsテーブルのポリシー

-- 全てのユーザーが投稿を閲覧可能
create policy "Users can view all posts"
    on posts for select
    using ( true );

-- ユーザーが自分の投稿を挿入可能
create policy "Users can insert own posts"
    on posts for insert
    with check ( auth.uid() = user_id );

-- ユーザーが自分の投稿を更新可能
create policy "Users can update own posts"
    on posts for update
    using ( auth.uid() = user_id );

-- ユーザーが自分の投稿を削除可能
create policy "Users can delete own posts"
    on posts for delete
    using ( auth.uid() = user_id );

