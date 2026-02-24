import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

async function main() {
    console.log('Connecting to database...');

    await pool.query(`
    CREATE TABLE IF NOT EXISTS todos (
      id SERIAL PRIMARY KEY,
      text TEXT NOT NULL,
      completed BOOLEAN DEFAULT FALSE,
      priority VARCHAR(50) DEFAULT 'medium',
      due VARCHAR(50),
      "createdAt" TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS alerts (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      "desc" TEXT,
      type VARCHAR(50),
      icon VARCHAR(50),
      color VARCHAR(50),
      bg VARCHAR(50),
      border VARCHAR(50),
      "createdAt" TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS notes (
      id SERIAL PRIMARY KEY,
      content TEXT NOT NULL,
      "createdAt" TIMESTAMP DEFAULT NOW(),
      "updatedAt" TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS bookmarks (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      url TEXT DEFAULT '#',
      icon VARCHAR(50),
      color VARCHAR(50),
      bg VARCHAR(50),
      "createdAt" TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS renewals (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      type VARCHAR(50),
      date VARCHAR(50),
      status VARCHAR(50),
      statusColor VARCHAR(100),
      "createdAt" TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS actions_tasks (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      type VARCHAR(50),
      priority VARCHAR(50),
      due VARCHAR(50),
      status VARCHAR(50),
      "createdAt" TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS claims (
      id VARCHAR(50) PRIMARY KEY,
      policy TEXT NOT NULL,
      stage VARCHAR(50),
      status VARCHAR(50),
      "createdAt" TIMESTAMP DEFAULT NOW()
    );
  `);
    console.log('Tables created successfully!');

    // Seed data if empty
    const { rows: notes } = await pool.query('SELECT * FROM notes');
    if (notes.length === 0) {
        console.log('Seeding data...');
        await pool.query(`
      INSERT INTO notes (content) VALUES (
        'یادآوری: جلسه با مدیر فروش ساعت ۱۴:۰۰\n\nنکات مهم برای تمدید قرارداد شرکت آلفا:\n- بررسی تخفیف عدم خسارت\n- اضافه کردن پوشش نوسانات'
      );
      
      INSERT INTO todos (text, completed, priority, due) VALUES 
        ('پیگیری خسارت آقای رضایی', false, 'high', 'امروز'),
        ('ارسال پیش‌فاکتور شرکت آلفا', false, 'medium', 'فردا'),
        ('بررسی کارمزد ماه گذشته', true, 'low', 'دیروز');
      
      INSERT INTO alerts (title, "desc", type, icon, color, bg, border) VALUES
        ('هشدار افت عملکرد', 'صدور بیمه‌نامه در هفته جاری ۲۰٪ کاهش یافته است.', 'warning', 'AlertTriangle', 'text-amber-500', 'bg-amber-50 dark:bg-amber-500/10', 'border-amber-200 dark:border-amber-500/20'),
        ('رد شدن بیمه‌نامه بدنه', 'بیمه‌نامه شماره ۱۲۳۴۵ به دلیل نقص مدارک رد شد.', 'error', 'XCircle', 'text-rose-500', 'bg-rose-50 dark:bg-rose-500/10', 'border-rose-200 dark:border-rose-500/20'),
        ('بروزرسانی سیستم سنهاب', 'سیستم سنهاب فردا از ساعت ۲ تا ۴ بامداد در دسترس نخواهد بود.', 'info', 'Info', 'text-blue-500', 'bg-blue-50 dark:bg-blue-500/10', 'border-blue-200 dark:border-blue-500/20');
        
      INSERT INTO bookmarks (title, icon, color, bg) VALUES
        ('صدور ثالث', 'LinkIcon', 'text-blue-500', 'bg-blue-50 dark:bg-blue-500/10'),
        ('صدور بدنه', 'LinkIcon', 'text-emerald-500', 'bg-emerald-50 dark:bg-emerald-500/10'),
        ('استعلام‌ها', 'Folder', 'text-amber-500', 'bg-amber-50 dark:bg-amber-500/10'),
        ('گزارش کمیسیون', 'LinkIcon', 'text-purple-500', 'bg-purple-50 dark:bg-purple-500/10'),
        ('پشتیبانی', 'LinkIcon', 'text-rose-500', 'bg-rose-50 dark:bg-rose-500/10');

      INSERT INTO renewals (name, type, date, status, statusColor) VALUES
        ('علی محمدی', 'ثالث', 'امروز', 'نیاز به تماس', 'text-amber-500 bg-amber-50 dark:bg-amber-500/10'),
        ('شرکت آلفا', 'مسئولیت', 'فردا', 'در حال بررسی', 'text-blue-500 bg-blue-50 dark:bg-blue-500/10'),
        ('سارا احمدی', 'بدنه', '۳ روز دیگر', 'ارسال پیامک', 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10');

      INSERT INTO actions_tasks (title, type, priority, due, status) VALUES
        ('بررسی مدارک خسارت', 'خسارت', 'بالا', 'امروز', 'باز'),
        ('تماس با مشتریان VIP', 'فروش', 'متوسط', 'فردا', 'در حال انجام');

      INSERT INTO claims (id, policy, stage, status) VALUES
        ('C-1024', 'بدنه - پژو ۲۰۶', 'ارزیابی', 'نیاز به مدرک'),
        ('C-1025', 'ثالث - پراید', 'پرداخت', 'تایید شده');
    `);
        console.log('Data seeded successfully!');
    } else {
        console.log('Skipping data seed as tables are not empty.');
    }

    process.exit(0);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
