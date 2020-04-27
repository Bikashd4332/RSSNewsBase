# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20200426104002) do

  create_table "agencies", force: :cascade do |t|
    t.string   "name",       limit: 255, null: false
    t.string   "logo_path",  limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "agency_feeds", force: :cascade do |t|
    t.string   "url",         limit: 255, null: false
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
    t.integer  "category_id", limit: 4,   null: false
    t.integer  "agency_id",   limit: 4,   null: false
  end

  add_index "agency_feeds", ["agency_id"], name: "index_agency_feeds_on_agency_id", using: :btree
  add_index "agency_feeds", ["category_id"], name: "index_agency_feeds_on_category_id", using: :btree

  create_table "categories", force: :cascade do |t|
    t.string   "name",        limit: 255,   null: false
    t.text     "description", limit: 65535, null: false
    t.string   "icon",        limit: 255
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
  end

  create_table "news", id: false, force: :cascade do |t|
    t.string   "id",             limit: 255,   null: false
    t.string   "title",          limit: 255,   null: false
    t.text     "description",    limit: 65535, null: false
    t.datetime "publish_date",                 null: false
    t.string   "url",            limit: 255,   null: false
    t.integer  "click_count",    limit: 4,     null: false
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
    t.integer  "agency_feed_id", limit: 4,     null: false
  end

  add_index "news", ["agency_feed_id"], name: "index_news_on_agency_feed_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "name",            limit: 255,             null: false
    t.string   "email",           limit: 255,             null: false
    t.string   "password_digest", limit: 255,             null: false
    t.datetime "created_at",                              null: false
    t.datetime "updated_at",                              null: false
    t.integer  "token_version",   limit: 4,   default: 1, null: false
  end

  create_table "users_agencies", force: :cascade do |t|
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
    t.integer  "user_id",    limit: 4
    t.integer  "agency_id",  limit: 4
  end

  add_index "users_agencies", ["agency_id"], name: "index_users_agencies_on_agency_id", using: :btree
  add_index "users_agencies", ["user_id"], name: "index_users_agencies_on_user_id", using: :btree

  create_table "users_categories", force: :cascade do |t|
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
    t.integer  "user_id",     limit: 4
    t.integer  "category_id", limit: 4
  end

  add_index "users_categories", ["category_id"], name: "index_users_categories_on_category_id", using: :btree
  add_index "users_categories", ["user_id"], name: "index_users_categories_on_user_id", using: :btree

  add_foreign_key "agency_feeds", "agencies"
  add_foreign_key "agency_feeds", "categories"
  add_foreign_key "news", "agency_feeds"
  add_foreign_key "users_agencies", "agencies"
  add_foreign_key "users_agencies", "users"
  add_foreign_key "users_categories", "categories"
  add_foreign_key "users_categories", "users"
end
