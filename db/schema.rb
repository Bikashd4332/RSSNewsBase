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

ActiveRecord::Schema.define(version: 20200330164637) do

  create_table "agencies", force: :cascade do |t|
    t.string   "name",       limit: 255, null: false
    t.string   "logo_path",  limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "agency_feeds", force: :cascade do |t|
    t.string   "url",           limit: 255, null: false
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
    t.integer  "categories_id", limit: 4,   null: false
    t.integer  "agencies_id",   limit: 4,   null: false
  end

  add_index "agency_feeds", ["agencies_id"], name: "index_agency_feeds_on_agencies_id", using: :btree
  add_index "agency_feeds", ["categories_id"], name: "index_agency_feeds_on_categories_id", using: :btree

  create_table "categories", force: :cascade do |t|
    t.string   "title",      limit: 255, null: false
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "news", force: :cascade do |t|
    t.string   "news",          limit: 255,   null: false
    t.text     "description",   limit: 65535, null: false
    t.datetime "publish_date",                null: false
    t.string   "url",           limit: 255,   null: false
    t.integer  "click_count",   limit: 4,     null: false
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.integer  "categories_id", limit: 4,     null: false
    t.integer  "agencies_id",   limit: 4,     null: false
  end

  add_index "news", ["agencies_id"], name: "index_news_on_agencies_id", using: :btree
  add_index "news", ["categories_id"], name: "index_news_on_categories_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "name",          limit: 255,             null: false
    t.string   "email",         limit: 255,             null: false
    t.string   "password",      limit: 255,             null: false
    t.datetime "created_at",                            null: false
    t.datetime "updated_at",                            null: false
    t.integer  "token_version", limit: 4,   default: 1, null: false
  end

  add_foreign_key "agency_feeds", "agencies", column: "agencies_id"
  add_foreign_key "agency_feeds", "categories", column: "categories_id"
  add_foreign_key "news", "agencies", column: "agencies_id"
  add_foreign_key "news", "categories", column: "categories_id"
end
