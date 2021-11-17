import { LastPageOutlined } from '@mui/icons-material';

enum KeyState {
    Up,
    Down,
    held,
    released,
}

export class Input {
    private upInputs = new Map<string, string>([]);
    private downInputs = new Map<string, string>([]);
    
    private inputs = new Map<string, KeyState>([]);

    constructor() {
        console.log(' TEST TEST ', this.downInputs);
        this.downInputs = new Map<string, string>([]);
        console.log( ' test test test', this.downInputs);
    }

    public onKeyDown(key: string): void {
        this.downInputs.set(key, key);
    }

    public onKeyUp(key: string): void {
        this.upInputs.set(key, key);
    }

    public getKeyDown(key: string): boolean {
        const keyState = this.inputs.get(key);

        return Boolean(keyState) && keyState === KeyState.Down;
    }

    public getKeyUp(key: string): boolean {
        const keyState = this.inputs.get(key);

        return Boolean(keyState) && keyState === KeyState.Up;
    }

    public onFrameStart(): void {
        this.downInputs.forEach((input) => {
            const lastKnownKeyState = this.inputs.get(input);

            if (!Boolean(lastKnownKeyState)) {
                console.log('key was pressed', input);
                this.inputs.set(input, KeyState.Down);
            } else {
                if (lastKnownKeyState === KeyState.Down) {
                    console.log('Key is being held', input);
                    this.inputs.set(input, KeyState.held);
                }
            }
        });

        this.upInputs.forEach((input) => {
            console.log('Key Was Un Pressed', input);
            this.inputs.set(input, KeyState.Up);
        });
    }

    public onFrameEnd(): void {
        this.inputs.forEach((keyState, key) => {
            if (keyState === KeyState.Up) {
                console.log('Releasing Key', key);
                this.inputs.set(key, KeyState.released);
            }
        });

        this.upInputs.clear();
    }
}