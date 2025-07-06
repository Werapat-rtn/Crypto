require('dotenv').config();
const db = require('../models');
const { Asset, User, Wallet } = db;

const seed = async () => {
    await db.sequelize.sync({ force: true });

    const assets = await Asset.bulkCreate([
        { code: 'BTC', name: 'Bitcoin', precision: 8, is_active: true },
        { code: 'ETH', name: 'Ethereum', precision: 8, is_active: true },
        { code: 'XRP', name: 'Ripple', precision: 8, is_active: true },
        { code: 'DOGE', name: 'Dogecoin', precision: 8, is_active: true }
    ]);

    const user = await User.create({
        email: 'test@example.com',
        password_hash: 'hashed_password',
        full_name: 'Test User',
        kyc_status: 'approved',
        is_active: true
    });

    for (const asset of assets) {
        await Wallet.create({
            user_id: user.id,      // ตรงกับชื่อ column ใน model/DB
            asset_code: asset.code,
            balance: 0,
            available_balance: 0,
            frozen_balance: 0
        });
    }

    console.log('✅ Seed complete');
    process.exit();
};

seed();
