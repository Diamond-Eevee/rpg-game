import { CharacterController } from "./character-controller";

export class UserController {
    constructor(private characterController: CharacterController) {

    }

    public initController(): void {
        document.addEventListener('keydown', (e) => {
            switch (e.key.toLowerCase()) {
                case 'w':
                    this.characterController.setPlayerTarget(0, -1);
                    break;
                case 's':
                    this.characterController.setPlayerTarget(0, 1);
                    break;
                case 'a':
                    this.characterController.setPlayerTarget(-1, 0);
                    break;
                case 'd':
                    this.characterController.setPlayerTarget(1, 0);
                    break;
            }
        });
    }
}
