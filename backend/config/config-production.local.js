/* 개발 환경 구성 파일 */
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

module.exports = {
	mysql: {
		host: process.env.DB_HOST,
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
		port: 3306,
		pool: {
			max: 10,
			min: 0,
			idle: 30000
		},
		timezone: '+09:00'
	},
	redis: {
		host: '127.0.0.1',
		port: 6379,
	},
	redisCache: {
		expire: 900,
		playerPrefix: 'player:',
		sessionPrefix: 'sess:',
		gameRoomPrefix: 'room:',
		aiChatPrefix: 'aiChat:',
		playCardTimerKeyStr: 'playCardTimer',
		gamePrefix: 'game:',
		playerRecordPrefix: 'playerRecord:',
		gameRecordPrefix: 'gameRecord:',
		rankPrefix: 'rank:',
		rankSubTopPlayersListPrefix: 'rank:topPlayersList:',
	},
	logConf: {
		appenders: {
			poker: { type: "dateFile", filename: "log/poker", pattern: '.yyyy-MM-dd.log', alwaysIncludePattern: true }
		},
		categories: {
			default: { appenders: ["poker"], level: "warn" }
		}
	},
	port: process.env.API_PORT,
	frontOrigin: 'https://one.c4ei.net',
	APIRoot: '/rest/v1',
	session: {
		name: 'one_c4ei_net',
		secret: 'journey_one_c4ei.net!',
		cookie: {
			maxAge: 3600000,// 1 hour
			secure: false,
			httpOnly: false, //true인 경우 프런트 엔드는 쿠키를 얻을 수 없습니다.
		},
		resave: false,
		saveUninitialized: false
	},
	httpHeaders: {
		allowHeaders: 'Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method',
		allowMethods: 'GET, POST, OPTIONS, PATCH, PUT, DELETE',
		allowCredentials: 'true',
	},
	ws: {
		deadTtl: 100, //2700
		forceLogoutTtl: 300, //3000 ,  시간이 이 숫자보다 작을 경우 일정 시간 동안 작업이 없었으므로 숫자를 압착할 수 있음을 의미합니다.
		checkPeriod: 60000,
		config: {
			clientTracking: true,
			noServer: true,
			perMessageDeflate: {
				zlibDeflateOptions: {
					chunkSize: 1024,
					memLevel: 7,
					level: 3
				},
				zlibInflateOptions: {
					chunkSize: 10 * 1024
				},
				clientNoContextTakeover: true,
				serverNoContextTakeover: true,
				serverMaxWindowBits: 10,
				concurrencyLimit: 10,
				threshold: 1024,
			}
		},
	}
}

