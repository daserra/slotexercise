import {GameRendererImp} from "./GameRenderer";
import {GameLoaderImp} from "./GameLoader";
import {GameEngine} from "./GameEngine";
import {LoaderController} from "./controllers/LoaderController";
import {GamePlay} from "./GamePlay";

async function init(gameEngine: GameEngine) {
    const loaderController = new LoaderController(gameEngine);
    await loaderController.loadAssets();
    loaderController.destroy();
}

function play(gameEngine: GameEngine) {
    const gamePlay = new GamePlay(gameEngine);
    gamePlay.prepareUI();
    gamePlay.prepareSlot();
    loopGame(gamePlay);
}

function loopGame(gamePlay) {
    gamePlay.startRound().then(() => loopGame(gamePlay));
}

window.onload = async () => {
    const gameEngine = new GameEngine(new GameLoaderImp(), new GameRendererImp());
    await init(gameEngine);
    play(gameEngine);
};