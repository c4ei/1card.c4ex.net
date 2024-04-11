/* 异常信息配置文件 예외 정보 구성 파일 */
module.exports = {
    SESSION_TIMEOUT: { code: 401, message: '계정 정보가 만료되었습니다. 다시 시도해 주세요' },
    WEBSOCKET_SESSION_TIMEOUT: { code: 1000, message: '계정 정보가 만료되었습니다. 다시 시도해 주세요' },
    USERNAME_NOT_FOUND: { code: 406, message: '사용자 이름이 존재하지 않습니다. 다시 입력해 주세요.' },
    USERNAME_USED: { code: 406, message: '이미 사용된 사용자 이름입니다. 다시 입력해 주세요.' },
    WRONG_PASSWORD: { code: 406, message: '비밀번호가 정확하지 않습니다. 다시 입력해 주세요.' },
    DUBLICATE_ACCESS: { code: 409, message: '시스템에서 중복된 로그인을 감지했습니다. 나중에 다시 시도해 주세요.' },
    INVITATIONCODE_NOT_FOUND: { code: 406, message: '초대코드가 존재하지 않습니다. 다시 입력해주세요.' },
    INVITATIONCODE_USED: { code: 406, message: ' 이미 사용된 초대코드입니다. 다시 입력해 주세요.' },
    ROOM_FULL: { code: 0, message: ' 방이 꽉 차서 들어갈 수 없어요' },
    SEAT_FULL: { code: 0, message: '자리가 꽉 차서 들어갈 수 없어요' },
    ALREADY_IN_ROOM: { code: 0, message: '이미 방에 있어요' },
    POKER_TIMER_EXPIRED: { code: 0, message: '시간 초과, 카드 플레이 실패' },
    SET_ONLINE_ERROR: { code: 0, message: '작업이 실패했습니다. 나중에 다시 시도해 주세요.' },
    CACHE_DOES_NOT_EXIST: { code: 0, message: '캐시가 존재하지 않습니다' },
    SERVER_BAD_STATUS: { code: 0, message: '데이터 패킷 손실, 지연이 있는 경우 새로고침해 보세요.' },
}