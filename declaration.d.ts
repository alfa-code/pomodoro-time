declare module '*.scss';
declare module '*.png';
declare module '*.bmp';
declare module '*.gif';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.mp3';
declare module '*.aac';

declare module "worker-loader!*" {
    class WebpackWorker extends Worker {
      constructor();
    }

    export default WebpackWorker;
}
