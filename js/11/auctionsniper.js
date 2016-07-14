


// Main을 만든다
// 최소기능 Window를 만들고
// auction에 join 한다.
const Main = class{
    constructor(sniperId, itemId) {
        this.sniperId = sniperId;
        this.itemId = itemId;
        this.ui = new MainWindow();
        this.joinAuction(this.itemId);
    }
    joinAuction(itemId) {
        Connection.connection(
            `join/${itemId}`,
            data=>this.ui.showStatus(MainWindow.STATUS_JOINING)
        );
    }
}

// 화면이 필요하므로 UI로 만들 MainWindow를 만든다.
const MainWindow = class{
    // join 상태와 lost 상태를 표현할 상수 구현
    static get STATUS_JOINING() {return 'joining';}
    static get STATUS_LOST() {return 'lost'}
    constructor(status) {
        // 메인 프레임 생성
        const frame = document.body.appendChild(document.createElement('div'));
        frame.style.cssText = 'background:#ff0;border:1px solid #000;border-radius:5px';
        // 현재 sniper의 상태를 보여줄 div영역 생성
        this.sniperStatus = frame.appendChild(document.createElement('div'));
        this.sniperStatus.id = 'sniperStatus';
    }
    // 현재 상태를 보여주는 메서드
    showStatus(status) {
        this.sniperStatus.innerHTML = status;
    }
    
}


const Driver = class {
    constructor(main) {
        this.main = main;
    }
    showSniperStatus(statusText) {
        return document.getElementById('sniperStatus').innerHTML.includes(statusText);
    }
};

const Runner = class{
    constructor() {
        this.sniper_id = 'yb';
    }
    startBiddingIn(itemId) {    // 
        this.main = new Main(this.sniper_id, itemId);
        this.driver = new Driver(this.main);
        this.driver.showSniperStatus(MainWindow.STATUS_JOINING);
    }
    showsSniperHasLostAuction() {
        return this.driver.showSniperStatus(MainWindow.STATUS_LOST);
    }
}

