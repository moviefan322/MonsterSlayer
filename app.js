const getAttackValue = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
    };
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyles() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.playerHealth + "%" };
    },
    mayUseSpecialAttack() {
      return this.currentRound % 3 !== 0;
    },
  },
  methods: {
    attackMonster() {
      this.currentRound++;
      const attackValue = getAttackValue(5, 12);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getAttackValue(8, 15);
      this.playerHealth -= attackValue;
    },
    specialAttackMonster() {
      this.currentRound++;
      const attackValue = getAttackValue(10, 25);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
    },
    healPlayer() {
      this.currentRound++;
      const healValue = getAttackValue(8, 20);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.attackPlayer();
    },
  },
});

app.mount("#game");
