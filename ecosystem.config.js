module.exports = {
    apps: [
      {
        name: 'Hyena Pets',
        script: 'npm',
        args: 'run dev',
        exec_mode: 'fork',
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
      },
    ],
  };
