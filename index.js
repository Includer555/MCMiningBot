const mineflayer = require("mineflayer");
const AutoAuth = require('mineflayer-auto-auth')
const pathfinder = require('mineflayer-pathfinder').pathfinder
const Movements = require('mineflayer-pathfinder').Movements
const { GoalNear } = require('mineflayer-pathfinder').goals

const bot = mineflayer.createBot({
    host: 'playthevillagers.survival-zone.com',              //'playthevillagers.survival-zone.com'
    username: 'Ferike09',
    auth: 'offline',
    port: 25573,
    version: '1.19.3',
    plugins: [AutoAuth],
    AutoAuth: {
        logging: true,
        password: 'feriveri',
        ignoreRepeat: true,
    }
});

let mcData

bot.once("spawn", () => {
    mcData = require('minecraft-data')(bot.version);
}) 

bot.loadPlugin(pathfinder);
bot.loadPlugin(require('mineflayer-collectblock').plugin)

let mining = false;

async function collectLog() {
    const grass = bot.findBlock({
      matching: mcData.blocksByName.oak_log.id,
      maxDistance: 64
    })
  
    if (grass && mining) {
      try {
        await bot.collectBlock.collect(grass)
        collectLog() 
      } catch (err) {
        console.log(err) 
      }
    }
  }

  async function collectDia() {
    const dia = bot.findBlock({
      matching: mcData.blocksByName.diamond_ore.id,
      maxDistance: 64
    })
  
    if (dia && mining) {
      try {
        await bot.collectBlock.collect(dia)
        collectDia() 
      } catch (err) {
        console.log(err) 
      }
    }
  }

  async function collectIron() {
    const iron = bot.findBlock({
      matching: mcData.blocksByName.iron_ore.id,
      maxDistance: 64
    })
  
    if (iron && mining) {
      try {
        await bot.collectBlock.collect(iron)
        collectIron() 
      } catch (err) {
        console.log(err) 
      }
    }
  }

  async function collectRedstone() {
    const redstone = bot.findBlock({
      matching: mcData.blocksByName.redstone_ore.id,
      maxDistance: 64
    })
  
    if (redstone && mining) {
      try {
        await bot.collectBlock.collect(redstone)
        collectRedstone() 
      } catch (err) {
        console.log(err) 
      }
    }
  }

async function comeToP() {
    const target = bot.players["Includer"].entity.position;

    const defaultMove = new Movements(bot)

    bot.pathfinder.setMovements(defaultMove)
    bot.pathfinder.setGoal(new GoalNear(target.x, target.y, target.z, 1))
}

bot.on('chat', (username, message) => {
    if (message === "t") {
        mining = true;
        collectLog();
    }

    if (message === "a") {
        mining = true;
        collectDia();
    }

    if (message === "b") {
        mining = true;
        collectRedstone();
    }

    if (message === "c") {
        mining = true;
        collectIron();
    }

    if (message === "z") {
        mining = false;
    }

    if (message === "p") {
        comeToP();
    }
})