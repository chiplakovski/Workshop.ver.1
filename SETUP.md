# Поставување (еднократно)

Овие чекори ги правиш само еднаш, за да ја поврзеш апликацијата со бесплатна
hosted база (Supabase) и бесплатен hosting (Vercel). Не бара претходно
програмерско искуство — само следи ги чекорите.

## 1. Направи бесплатен Supabase проект (базата)

1. Оди на [supabase.com](https://supabase.com) → **Start your project** →
   регистрирај се (со email на фирмата).
2. **New project** → избери име (на пр. `workshop`) и силна лозинка за
   базата (зачувај ја лозинката на сигурно место, на пр. password manager —
   ретко ти треба, но ако ја изгубиш нема лесен начин да ја вратиш).
3. Избери регион најблиску до фирмата (на пр. Europe/Stockholm ако е во
   Шведска).
4. Почекај 1-2 минути додека проектот се креира.
5. Во левото мени: **SQL Editor** → **New query** → залепи ја целата
   содржина на фајлот [`supabase/schema.sql`](supabase/schema.sql) од овој
   repo → **Run**. Ова ги прави табелите и правилата за пристап.
6. Во левото мени: **Project Settings → API**. Ќе ти требаат два податока:
   - **Project URL**
   - **anon public** клуч (НЕ земај го „service_role" клучот — тој е тајна и
     никогаш не смее да се стави во кодот).

## 2. Внеси ги клучевите во апликацијата

Отвори го `config.js` во repo-то и замени ги двете placeholder вредности со
Project URL и anon public клучот од чекор 1.6. Ова можеш да ми го кажеш мене
(URL + anon клуч) и јас ќе го направам тоа наместо тебе — тие два податока
не се тајна, безбедно е да ми ги пратиш.

## 3. Google login

1. Во Supabase отвори **Authentication → Providers → Google** и активирај го
   Google provider-от.
2. Во Google Cloud Console направи OAuth Client ID од тип **Web application**.
3. Во Supabase внеси ги Google Client ID и Client Secret.
4. Во **Authentication → URL Configuration** додади redirect URL за твојот
   deployed домен со патека `/hub.html`.

OAuth не работи со директно отворање на `file://` HTML фајл. Користи Vercel
или локален HTTP server.

## 4. Направи бесплатен Vercel account (hosting)

1. Оди на [vercel.com](https://vercel.com) → регистрирај се со GitHub
   сметката поврзана со овој repo.
2. **Add New → Project** → избери го repo-то `chiplakovski/workshop.ver.1`.
3. Framework preset: **Other** (статички HTML фајлови, нема build чекор).
4. **Deploy**. По неколку секунди ќе добиеш бесплатен линк од типот
   `workshop-xxxx.vercel.app`.
5. Секој нареден push кон branch-от автоматски го ажурира сајтот.

## 5. Прв корисник (сопственик/admin)

1. Отвори го deployed линкот → `login.html` → најави се со Google
   (првиот корисник треба да си ти, сопственикот).
2. Во Supabase → **SQL Editor** → изврши:
   ```sql
   update public.profiles set role = 'admin'
   where id = (select id from auth.users where email = 'твојот@email.com');
   ```
   Ова те прави администратор со пристап до сè, а идните вработени што ќе
   се регистрираат ќе бидат обични корисници додека рачно не им се смени
   улогата на ист начин.

## За бекапот

Supabase бесплатниот план прави автоматски дневни бекапи со кратко
задржување (неколку дена). Бидејќи ќе чуваш сензибилни податоци, кога
апликацијата почне да се користи секојдневно во фирмата, препорачувам
надградба на **Pro план** (~25$/месец) кој дава подолго задржување на
бекапи и point-in-time recovery. Ова не мора да се направи веднаш — само
имај го на ум пред да тргнеш во продукциска употреба.

## Активирање на Projects модулот

Истиот чекор како за chat-от: **Supabase → SQL Editor → New query**, залепи ја
целата содржина од [`supabase/schema.sql`](supabase/schema.sql) и притисни
**Run**. Скриптата е безбедна за повторно извршување — ги додава табелите
`company_settings`, `rate_cards`, `projects`, `project_items`, `estimate_lines`
и `offers`, заедно со правилата за пристап.

Потоа, во **Table Editor → company_settings**, внеси ги податоците на фирмата
(име, адреса, org.nr, momsreg.nr, bankgiro, moms %). Тие се печатат на секоја
понуда, па внеси ги пред да испратиш прва понуда на клиент. Цените по час се
во **rate_cards** — таму се менуваат стандардните тарифи за работа и машини.
И двете табели ги менува само корисник со улога `admin`.

## Активирање на Team chat

По додавањето на chat функционалноста, отвори **Supabase → SQL Editor →
New query**, залепи ја целата содржина од [`supabase/schema.sql`](supabase/schema.sql)
и притисни **Run**. Скриптата е безбедна за повторно извршување и ги додава
`chat_messages`, правилата за пристап и live ажурирањето. Овој чекор се прави
само еднаш за постојниот Supabase проект.
