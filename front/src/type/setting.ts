/** 
 * @property {playSound} 是否播放音效
 * @property {playBgm} 是否播放音乐
 * @property {bgmVolume} 볼륨
 * @property {soundVolume} 음악 볼륨
 * @property {youTurnVoice} 是否播放카드 놀이提示音
 * @property {bianshenBorder} 是否显示변신 카드 테두리
 * @property {textToPlayer} 播放语音履历
 * @property {announceId} 已广播的通知id
 */
export interface SystemSetting {
    playSound: boolean,
    playBgm: boolean,
    bgmVolume: number,
    soundVolume: number,
    youTurnVoice: boolean,
    bianshenBorder: boolean,
    textToPlayer: TextToPlayer[],
    announceId: number,
}

/** 
 * @property {id} 语音id
 * @property {music} 语音路径
 * @property {text} 语音文本
 */
export interface TextToPlayer {
    id: number,
    music: string,
    text: string,
}

