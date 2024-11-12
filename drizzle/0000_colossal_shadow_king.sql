CREATE TABLE IF NOT EXISTS "api_keys" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "api_keys_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"userId" integer NOT NULL,
	"appId" uuid DEFAULT gen_random_uuid(),
	"key" varchar(255) NOT NULL,
	CONSTRAINT "api_keys_appId_unique" UNIQUE("appId"),
	CONSTRAINT "api_keys_key_unique" UNIQUE("key")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "books" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "books_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" varchar(255) NOT NULL,
	"isbn10" varchar(10) NOT NULL,
	"author" varchar(255) NOT NULL,
	CONSTRAINT "books_isbn10_unique" UNIQUE("isbn10")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"username" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_to_books" (
	"userId" integer NOT NULL,
	"bookId" integer NOT NULL,
	CONSTRAINT "users_to_books_userId_bookId_pk" PRIMARY KEY("userId","bookId")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "api_keys" ADD CONSTRAINT "api_keys_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_books" ADD CONSTRAINT "users_to_books_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_books" ADD CONSTRAINT "users_to_books_bookId_books_id_fk" FOREIGN KEY ("bookId") REFERENCES "public"."books"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_id_index" ON "api_keys" USING btree ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "app_id_index" ON "api_keys" USING btree ("appId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "email_index" ON "users" USING btree ("email");