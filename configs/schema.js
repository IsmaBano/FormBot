
import {boolean, integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";


export const JsonForms = pgTable('jsonForms', {
    id: serial('id').primaryKey(),
    jsonform: text('jsonform').notNull(),
    theme:varchar('theme'),
    background:varchar('background'),
    createdBy: varchar('createdBy', { length: 255 }).notNull(), 
    createdAt: varchar('createdAt', { length: 255 }).notNull() ,
    enabledSignIn:boolean('enabledSignIn').default(false)
});

export const userResponses = pgTable('userResponses', {
    id: serial('id').primaryKey(),
    jsonResponse: text('jsonResponse').notNull(),
    createdBy: varchar('createdBy', { length: 255 }).default('anonymous'), 
    createdAt: varchar('createdAt', { length: 255 }).notNull() ,
    formRef:integer('formRef').notNull().references(()=>JsonForms.id)
});
