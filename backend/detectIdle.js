const express = require('express');
const os = require('os-utils');
const notifier = require('node-notifier');
const IdleModel = require('./models/IdleModel');

const router = express.Router();

async function detectIdle() {
  return new Promise((resolve) => {
    os.cpuUsage((cpu) => {
      const idleInstances = [];
      if (cpu < 0.2) { // treat <20% CPU as idle
        idleInstances.push({ id: "local-vm", cpu });
      }
      resolve(idleInstances);
    });
  });
}

router.get('/detectIdle', async (req, res) => {
  const idleInstances = await detectIdle();

  if (idleInstances.length > 0) {
    await IdleModel.insertMany(idleInstances);

    console.log("⚠️ ALERT: Idle VMs detected!", idleInstances);
    notifier.notify({
      title: 'Idle VM Alert',
      message: `Idle VMs: ${idleInstances.map(vm => vm.id).join(', ')}`
    });

    // ✅ Emit realtime update if Socket.IO is available
    if (req.app.get('io')) {
      req.app.get('io').emit('idleUpdate', idleInstances);
    }
  }

  res.json({ idleInstances });
});

module.exports = { router, detectIdle };
