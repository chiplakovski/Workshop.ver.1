# Workshop.ver.1 — handoff

Последно ажурирање: 7 септември 2026

Овој документ е краток контекст за продолжување на проектот од друг
компјутер или во нов Codex разговор.

## Брз почеток од дома

```powershell
git clone https://github.com/chiplakovski/Workshop.ver.1.git
cd Workshop.ver.1
py -3 -m http.server 8765 --bind 127.0.0.1
```

Ако репото веќе постои локално:

```powershell
git pull origin main
```

Потоа отвори `http://127.0.0.1:8765/login.html`.

Предлог за првата порака во нов Codex разговор:

> Continue Workshop.ver.1 using HANDOFF.md and inspect the current main branch before making changes.

## Тековна состојба

Апликацијата е статички HTML/CSS/JavaScript проект без build чекор. Користи
Supabase за Google authentication, Postgres база, Row Level Security и live
chat ажурирања.

Главната функционалност е во:

- `login.html` — Google login, избор на јазик и global notifications.
- `hub.html` — Workspace dashboard, session status, modules и Team chat.
- `config.js` — Supabase Project URL и јавен anon key. Никогаш не додавај
  `service_role` key во frontend или во Git.
- `supabase/schema.sql` — profiles, chat messages, triggers, RLS policies и
  Realtime publication.
- `SETUP.md` — инструкции за Supabase, Google OAuth, Vercel и chat setup.

Baseline commit пред овој handoff: `60a4ddd` (`feat: redesign workspace and add team chat`).

## Што е имплементирано

### Login

- Google login преку Supabase.
- English, Macedonian и Swedish language selector.
- Responsive темен visual design.
- Сите login информации и грешки се прикажуваат долу лево.

### Workspace

- Компактен responsive dashboard.
- Редослед на modules: Hours, Projects, Store, Reports, Documents.
- Картичките немаат броеви и се порамнети по иста grid линија.
- Header покажува корисник, active session timer, датум и Sign out.
- Сите global application информации и грешки се прикажуваат долу лево.
- Module картичките моментално се визуелни и сè уште не отвораат посебни
  module страници.

### Team chat

- Десен Communications панел порамнет со првиот ред картички.
- Channels: General, Projects и Workshop.
- Пораки со име, initials avatar и timestamp.
- Сопствените пораки се визуелно одделени.
- `Enter` праќа порака; `Shift + Enter` додава нов ред.
- Supabase Postgres Changes за live пораки.
- Само authenticated users можат да читаат и праќаат.
- Sender ID и име се поставуваат со database trigger за да не можат да се
  лажираат од browser.

## Задолжителен Supabase чекор

За Team chat да работи на постојниот Supabase проект:

1. Отвори **Supabase → SQL Editor → New query**.
2. Залепи ја целата содржина од `supabase/schema.sql`.
3. Притисни **Run** еднаш.

Скриптата е направена да може безбедно повторно да се изврши. После тоа
тестирај го chat-от со два различни најавени корисници.

## Познат проблем со Google login

Последно беше забележана грешка:

```text
Unable to exchange external code: 4/0A...
```

Поради неуспешната OAuth размена, header-от останува на `Not signed in`.
Провери:

1. **Supabase → Authentication → Providers → Google** — Client ID и Client
   Secret мора да бидат точни.
2. Google Cloud OAuth client мора да го има овој exact Authorized redirect URI:

   ```text
   https://waqyxcphlkzzbnxgfibt.supabase.co/auth/v1/callback
   ```

3. **Supabase → Authentication → URL Configuration** мора да го содржи
   deployed доменот и redirect URL што завршува со `/hub.html`.
4. Започни свежа најава од `login.html`; Google authorization codes се
   краткотрајни и еднократни.

## LobeHub Skills Marketplace

Marketplace search skill-от е зачуван во:

```text
.agents/skills/lobehub-skills-search-engine/
```

LobeHub credentials намерно не се во Git. На нов компјутер регистрирај ја
локалната Codex инсталација:

```powershell
npx.cmd -y @lobehub/market-cli register `
  --name "Workshop Codex" `
  --description "Codex coding agent helping build and maintain the Workshop application." `
  --source codex
```

## Проверки направени пред handoff

- Inline JavaScript syntax check за `login.html` и `hub.html` — поминато.
- Desktop visual check на `1912 × 907` — поминато.
- Responsive правила за desktop, tablet и mobile се присутни.
- Git `main` беше синхронизиран со `origin/main` на baseline commit `60a4ddd`.

## Препорачан следен редослед

1. Поправи и потврди Google OAuth login.
2. Изврши го `supabase/schema.sql` и тестирај Team chat со два корисници.
3. Направи посебна страница за Hours и поврзи ја првата module картичка.
4. Потоа додавај Projects, Store, Reports и Documents една по една.

