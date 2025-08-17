#SupabaseDB 関連

##①SupabaseDB 接続確認
psql "$DIRECT_URL" -c "select now();"

##②.env ファイルの情報が環境に適応されているか確認
echo $NEXT_PUBLIC_SUPABASE_URL
echo $NEXT_PUBLIC_SUPABASE_ANON_KEY
echo "$DIRECT_URL"
echo "$DATABASE_URL"
echo $SUPABASE_SERVICE_ROLE_KEY

→ 表示されない場合
% export $(grep -v '^#' .env.local | xargs)

##③ カラム変更（schema.prisma からの反映）

### Prisma のマイグレーション作成

npx prisma migrate dev --name caram_update

### Supabase にデプロイ（ローカルの変更を反映）

npx prisma migrate deploy caram_update
