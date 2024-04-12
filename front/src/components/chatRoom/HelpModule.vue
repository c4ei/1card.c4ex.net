<template>
    <el-tabs type="border-card" v-model="activeHelpModuleTabName">
        <el-tab-pane label="게임규칙" name="rule" lazy>
            <h1 :style="{ 'font-size': fontSize }"><i class="el-icon-warning-outline"></i>게임소개</h1>
            <hr class="divider-line">
            <p :style="{ 'font-size': fontSize }">Journey to the West는 "Beast Fighting Chess"와 유사한 카드 게임입니다. 이 게임을 플레이하려면 최소 2명의 플레이어가 필요합니다. 2~10개의 배너 카드를 사용할 수 있습니다. 카드 수는 상황에 따라 늘리거나 줄일 수 있습니다. 인원수대로.</p>
            <p :style="{ 'font-size': fontSize }">또한 서유기의 동작 규칙은 지역에 따라 다르며, 다음 say은 작성자 자신의 의견일 뿐입니다.。</p>
            <h1 :style="{ 'font-size': fontSize }"><i class="el-icon-stopwatch"></i>게임 프로세스</h1>
            <hr class="divider-line">
            <h2 :style="{ 'font-size': fontSize }"> 开국：</h2>
            <p :style="{ 'font-size': fontSize }">开국每名플레이어起5장牌作为手牌，然后由随机一名(或上국수집된 카드 수最多的)플레이어시작PLAY。</p>
            <h2 :style="{ 'font-size': fontSize }">주문：</h2>
            <p :style="{ 'font-size': fontSize }">일반적으로 국PLAY플레이어 오프닝부터 시작하여 시계 반대 방향으로 주문PLAY를 진행하며, 플레이어가 플레이하는 관음이나 여래가 있을 때에는 PLAY 방향을 반대로 진행합니다.</p>
            <h2 :style="{ 'font-size': fontSize }">PLAY：</h2>
            <p :style="{ 'font-size': fontSize }">테이블에 카드가 없으면 플레이어는 동일한 카드 포인트(예: ♣a 및<span
                    style="color: red">♥A</span>)어떤 장 카드든지; 테이블 위에 이전 플레이어가 사용한 카드가 있으면 다음 플레이어가 크고 작은 것에 따라 그것을 플레이해야 합니다 주문 <u> 장의 개수가 동일하고 카드 종류가 이전 카드보다 "큰" 카드</u>등등</p>
            <h2 :style="{ 'font-size': fontSize }">连击：</h2>
            <p :style="{ 'font-size': fontSize }">打出的牌计入连击牌池，计+1。当PLAY数大于1时还会有倍乘效果。</p>
            <p :style="{ 'font-size': fontSize }">如连续5人打出2장牌，则倍乘效果的콤보 수计为： 4(2+2*1), 6(2+2*2), 8(2+3*2), 10(2+4*2),
                30(20+5*2)。
            </p>
            <p :style="{ 'font-size': fontSize }">如连续5人打出3장牌，则倍乘效果的콤보 수计为： 6(3+3*1), 9(3+3*2), 12(3+3*3), 15(3+4*3),
                57(39+6*3)。 </p>
            <p :style="{ 'font-size': fontSize }">倍乘的部分会从플레이어的수집된 카드 수中扣除。如콤보 수为6(2+2*2)时，从플레이어수집된 카드 수中扣除2*2=4장。</p>
            <h2 :style="{ 'font-size': fontSize }">补牌：</h2>
            <p :style="{ 'font-size': fontSize }">每次플레이어出完牌后，若剩余牌堆里还有牌，则将手牌补到5장。若剩余牌堆里已无牌，则每次PLAY的콤보 수+1，并把플레이어的수집된 카드 수扣除1。</p>
            <h2 :style="{ 'font-size': fontSize }">받다牌：</h2>
            <p :style="{ 'font-size': fontSize }">当플레이어打PASS“大于”牌时，则放弃PLAY并받다下所有连击牌池中的牌，计入自己的수집된 카드 수，然后重新시작PLAY。</p>
            <h2 :style="{ 'font-size': fontSize }">结算：</h2>
            <p :style="{ 'font-size': fontSize }">当所有플레이어的手牌出完后，结算所有플레이어的수집된 카드 수，结束게임。</p>
            <h1 :style="{ 'font-size': fontSize }"><i class="el-icon-finished"></i>大小주문</h1>
            <hr class="divider-line">
            <p :style="{ 'font-size': fontSize }"> Journey to the West는 모두 배너 카드를 사용하며 카드 포인트의 크기는 Beast Fighting Chess와 비슷합니다.</p>
            <p :style="{ 'font-size': fontSize }">其中</p>
            <h2 :style="{ 'font-size': fontSize }">특수 카드：</h2>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/3A.png')"></el-avatar>
            <span :style="{ 'font-size': fontSize }">3번 카드는 모든 몬스터보다 위대한 샤몽(Sha Monk)을 나타냅니다.</span>
            <br>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/8A.png')"></el-avatar>
            <span :style="{ 'font-size': fontSize }">카드 포인트 8은 모든 괴물과 모래 승려보다 더 위대한 8계를 나타냅니다.</span>
            <br>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/5A.png')"></el-avatar>
            <span :style="{ 'font-size': fontSize }">카드 포인트 5는 모든 괴물인 샤승과 바지에보다 더 큰 오공을 나타냅니다.</span>
            <br>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/10A.png')"></el-avatar>
            <span :style="{ 'font-size': fontSize }"> 카드 포인트 10은 마스터를 나타내며, 이는 견습생 3명보다 크고 모든 몬스터보다 작습니다.</span>
            <br>
            <el-avatar shape="square" :size="avatarSize + 40"
                :src="require('@/assets/images/poker/red-joker.png')"></el-avatar>
            <el-avatar shape="square" :size="avatarSize + 40"
                :src="require('@/assets/images/poker/black-joker.png')"></el-avatar>
            <span :style="{ 'font-size': fontSize }">각각 여래와 관음을 대표하는 대왕과 소왕은 모든 카드 포인트를 처리할 수 있으며, 플레이한 후에는 PLAY 방향이 반전되어 상가가 사용한 원래 카드가 남습니다.</span>
            <p :style="{ 'font-size': fontSize }">注意：大小王视为同一牌点。</p>
            <br>
            <h2 :style="{ 'font-size': fontSize }">요괴牌：</h2>
            <p :style="{ 'font-size': fontSize }">除특수 카드外，其余牌点均为요괴，</p>
            <span :style="{ 'font-size': fontSize }">大小주문为</span>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/2D.png')"></el-avatar>
            <span :style="{ 'font-size': fontSize }">最小</span>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/1A.png')"></el-avatar>
            <span :style="{ 'font-size': fontSize }">最大。</span>
            <br>
            <br>
            <h2 :style="{ 'font-size': fontSize }">花色주문：</h2>
            <p :style="{ 'font-size': fontSize }">同一牌点，花色按</p>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/2D.png')"></el-avatar>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/2C.png')"></el-avatar>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/2B.png')"></el-avatar>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/2A.png')"></el-avatar>
            <p :style="{ 'font-size': fontSize }">从小到大排序。</p>
            <br>
            <h2 :style="{ 'font-size': fontSize }">多牌比较：</h2>
            <p :style="{ 'font-size': fontSize }">当上家牌数量大于1时，比较규칙为 <u>每장牌均不小于上家牌，并且其中至少有一장“大于”上家牌。</u></p>
            <p :style="{ 'font-size': fontSize }">例如上家打出以下牌型：</p>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/2C.png')"></el-avatar>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/2B.png')"></el-avatar>
            <br>
            <p :style="{ 'font-size': fontSize }">则根据上述比较규칙，下家须至少打出</p>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/2B.png')"></el-avatar>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/2B.png')"></el-avatar>
            <p :style="{ 'font-size': fontSize }">的牌型。</p>
            <p :style="{ 'font-size': fontSize }">而下家如果想打下面这种牌型</p>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/2D.png')"></el-avatar>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/2A.png')"></el-avatar>
            <p :style="{ 'font-size': fontSize }">虽然其中一장♠2比<span style="color: red">♥2</span>大，但<span
                    style="color: red">♦2</span>小于♣2，不满足比较규칙，所以不能打出。</p>
            <h1 :style="{ 'font-size': fontSize }"><i class="el-icon-magic-stick"></i>변환牌</h1>
            <hr class="divider-line">
            <p :style="{ 'font-size': fontSize }">既然孙오공有七十二变，那么西游记中自然不能缺少변환元素。</p>
            <p :style="{ 'font-size': fontSize }">변환牌，顾名思义，可以改变自身牌面的牌。其규칙和用法类似于部分地区斗地主中使用的“癞子牌”。</p>
            <span :style="{ 'font-size': fontSize }">在게임中，带有蓝色边框的牌即是변환牌，如:</span>
            <el-avatar shape="square" :size="avatarSize + 40"
                :src="require('@/assets/images/bianshen-example.png')"></el-avatar>
            <h2 :style="{ 'font-size': fontSize }">변환규칙：</h2>
            <p :style="{ 'font-size': fontSize }">1. 변환牌须搭配其他牌(原形牌)使用才有效，单独打出时等同于打出其自身。</p>
            <span :style="{ 'font-size': fontSize }">如单独打出:</span>
            <el-avatar shape="square" :size="avatarSize + 40"
                :src="require('@/assets/images/bianshen-example.png')"></el-avatar>
            <br>
            <span :style="{ 'font-size': fontSize }">相当于打出: </span>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/2A.png')"></el-avatar>
            <br>
            <span :style="{ 'font-size': fontSize }">如组合打出: </span>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/3D.png')"></el-avatar>
            <el-avatar shape="square" :size="avatarSize + 40"
                :src="require('@/assets/images/bianshen-example.png')"></el-avatar>
            <br>
            <span :style="{ 'font-size': fontSize }">相当于打出: </span>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/3D.png')"></el-avatar>
            <el-avatar shape="square" style="margin-left: 0.5%" :size="avatarSize + 40"
                :src="require('@/assets/images/poker/3A.png')"></el-avatar>
            <p :style="{ 'font-size': fontSize }">上述例子中，<span style="color: red">♦3</span>称为“原形牌”。</p>
            <p :style="{ 'font-size': fontSize }">2. 변환牌변환后，牌点变为原形牌的牌点，花色保持自身的花色。</p>
            <p :style="{ 'font-size': fontSize }">3. 변환牌不能변환观音或如来(即반송 카드)。</p>
            <h2 :style="{ 'font-size': fontSize }">使用方法：</h2>
            <p :style="{ 'font-size': fontSize }">1. 要모프사용牌，首先请选择要作为변환对象的原形牌，如上述<span style="color: red">♦3</span>。</p>
            <p :style="{ 'font-size': fontSize }">2. 然后点击 <el-tag type="primary" effect="dark">변환</el-tag> 按钮，选择변환牌，如上述♠2。
            </p>
            <p :style="{ 'font-size': fontSize }">3. 选好변환牌后，最后点击PLAY即可。</p>
        </el-tab-pane>

        <el-tab-pane label="게임技巧" name="skill" lazy>
            <p :style="{ 'font-size': fontSize }"><i
                    class="el-icon-warning-outline"></i>西游记게임本身并没有什么太多技巧，플레이어받다牌多少，运气占很大部分，以下技巧仅供参考。</p>
            <h1 :style="{ 'font-size': fontSize }"><i class="el-icon-star-on"></i>保持牌型</h1>
            <hr class="divider-line">
            <p :style="{ 'font-size': fontSize }">尽量保证自己手上有各种牌型：요괴、徒弟、师傅，缺一不可。观音和如来则不到万不得已尽量不用，留作杀手锏。</p>
            <h1 :style="{ 'font-size': fontSize }"><i class="el-icon-star-on"></i>小牌先出</h1>
            <hr class="divider-line">
            <p :style="{ 'font-size': fontSize }">大多数时候，先把小牌打出去都是正确的选择，当然也有特殊情况，具体可参考下方“控制국势”。</p>
            <h1 :style="{ 'font-size': fontSize }"><i class="el-icon-star-on"></i>战略性받다牌</h1>
            <hr class="divider-line">
            <p :style="{ 'font-size': fontSize }">当连击牌池中的牌数不多，且手上的牌如以下所示时</p>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/2D.png')"></el-avatar>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/2A.png')"></el-avatar>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/2B.png')"></el-avatar>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/11A.png')"></el-avatar>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/3D.png')"></el-avatar>
            <p :style="{ 'font-size': fontSize }">虽然받다牌并不是我们想要的，但从长远的战略眼光来看，可以忍痛받다下牌，然后把3개2一次性打出以调整自己的手牌组合。</p>
            <h1 :style="{ 'font-size': fontSize }"><i class="el-icon-star-on"></i>控制국势</h1>
            <hr class="divider-line">
            <p :style="{ 'font-size': fontSize }">大部分情况下，牌국的走势是不受我们控制的，但我们仍然可以在一定范围内左右它。</p>
            <p :style="{ 'font-size': fontSize }">比如一场5人국게임，我们手上有以下牌型</p>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/4C.png')"></el-avatar>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/6B.png')"></el-avatar>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/13B.png')"></el-avatar>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/1D.png')"></el-avatar>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/8B.png')"></el-avatar>
            <p :style="{ 'font-size': fontSize }">此时上家입력됨一개♠2，</p>
            <p :style="{ 'font-size': fontSize }">
                虽然大多数时候我们都从小牌出起，但考虑到국势的发展，如果我们接着打出♣4，等再次轮到我们时，上家牌极有可能是徒弟牌，而此时我们手上徒弟师傅牌不足，无法应付可能到来的情况。</p>
            <p :style="{ 'font-size': fontSize }">所以一개较为大胆的做法是：打出K或者A。这样大概率等再次轮到我们时，上家牌会是师傅或者一개点数较小的요괴。</p>
            <p :style="{ 'font-size': fontSize }">当然，以上只是举例，实际情况可能更加复杂，须根据自己的手牌情况和场上국势来判断。</p>
            <p :style="{ 'font-size': fontSize }">如开头所说，牌국的走势大多数时候是不可控的，况且还有观音如来这些逆天因素的存在，以上方法并不总是有效。</p>
        </el-tab-pane>

        <el-tab-pane label="常见问题" name="questions" lazy>
            <el-collapse v-model="activeQuestionNames">
                <el-collapse-item name="0">
                    <template slot="title">
                        <i class="el-icon-info"></i><span :style="{ 'font-size': fontSize }">作者建议</span>
                    </template>
                    <div>
                        <p :style="{ 'font-size': fontSize }">1：建议尽量使用当今的主流浏览器如Chorme, Safari, Firefox等。</p>
                        <p :style="{ 'font-size': fontSize }">2：建议尽量使用大屏幕手机以防止画面出现元素重叠，溢出边界等问题。</p>
                        <p :style="{ 'font-size': fontSize }">3：遇到系统性问题时，可先尝试刷新网页。刷新后如果问题仍没有得到解决，请参考下面回答或연락하기。</p>
                    </div>
                </el-collapse-item>
                <el-collapse-item name="1">
                    <template slot="title">
                        <i class="el-icon-question"></i><span
                            :style="{ 'font-size': fontSize }">Q：画面出现不正常抖动，溢出边界，渲染错误等问题？</span>
                    </template>
                    <div>
                        <p :style="{ 'font-size': fontSize }">
                            尽管作者已针对各种主流浏览器和移动端做出了响应式布국的设计，但仍然有部分移动端的尺寸会使得画面无法被正确渲染，解决的办法是尝试切换横竖屏后刷新网页。</p>
                        <p :style="{ 'font-size': fontSize }">注意：切换横竖屏后不刷新网页可能会导致一些画面元素渲染位置不正确的问题。</p>
                        <p :style="{ 'font-size': fontSize }">
                            如果切换横竖屏刷新后仍不能解决您的问题，请将您所使用的移动端机型以及出现问题的画面截屏전송给作者以使我们作出针对该机型的调整，谢谢。</p>
                    </div>
                </el-collapse-item>
                <el-collapse-item name="2">
                    <template slot="title">
                        <i class="el-icon-question"></i><span :style="{ 'font-size': fontSize }">Q：로그인网页时不想播放音乐？</span>
                    </template>
                    <div>
                        <p :style="{ 'font-size': fontSize }">点击로그인页面右上角的播放键即可닫기音乐的自动播放。</p>
                    </div>
                </el-collapse-item>
                <el-collapse-item name="3">
                    <template slot="title">
                        <i class="el-icon-question"></i><span
                            :style="{ 'font-size': fontSize }">Q：설정了배경 음악和게임音效开启但仍然没有声音？</span>
                    </template>
                    <div>
                        <p :style="{ 'font-size': fontSize }">由于ios等移动端的限制，进入本网页时并不会自动播放音乐，而是需要点击屏幕一下以激活音乐播放器，才能成功播放音乐。</p>
                        <p :style="{ 'font-size': fontSize }">如果您点击了屏幕后仍不会播放音乐，请将您所使用的浏览器和移动端机型전송给作者以使我们作出针对性的调整，谢谢。</p>
                    </div>
                </el-collapse-item>
                <el-collapse-item name="4">
                    <template slot="title">
                        <i class="el-icon-question"></i><span :style="{ 'font-size': fontSize }">Q：无法通过게임内설정调整音量？</span>
                    </template>
                    <div>
                        <p :style="{ 'font-size': fontSize }">如果您是ios用户，由于ios禁止通过网页调整系统音量，所以ios用户的설정面板上没有调整音量的选项。</p>
                        <p :style="{ 'font-size': fontSize }">
                            如果您不是ios用户，那么可以认为您使用的移动端也采取了与上述ios相同的策略，请将您的移动端机型전송给作者以使我们作出针对该机型的调整，谢谢。</p>
                    </div>
                </el-collapse-item>
                <el-collapse-item name="5">
                    <template slot="title">
                        <i class="el-icon-question"></i><span :style="{ 'font-size': fontSize }">Q：게임内호스팅失败？</span>
                    </template>
                    <div>
                        <p :style="{ 'font-size': fontSize }">由于本网页的게임数据并没有설정锁机制，所以当网络延迟较大时，提交호스팅可能会失败，属正常行为。</p>
                        <p :style="{ 'font-size': fontSize }">建议您在玩게임时保持通畅的网咯。</p>
                    </div>
                </el-collapse-item>
                <el-collapse-item name="6">
                    <template slot="title">
                        <i class="el-icon-question"></i><span :style="{ 'font-size': fontSize }">Q：게임内如何快速PLAY？</span>
                    </template>
                    <div>
                        <p :style="{ 'font-size': fontSize }">在选择好要出的牌后，除了点击“PLAY”按钮，还可以通过点击台面来PLAY。</p>
                    </div>
                </el-collapse-item>
                <el-collapse-item name="7">
                    <template slot="title">
                        <i class="el-icon-question"></i><span :style="{ 'font-size': fontSize }">Q：게임进行时如何与플레이어交流？</span>
                    </template>
                    <div>
                        <p :style="{ 'font-size': fontSize }">本网页效仿了各种棋牌게임的防作弊机制，即게임进行中时不能通过打字与其他플레이어交流。</p>
                        <p :style="{ 'font-size': fontSize }">但我们仍为您준비하다了一些SPEED的语句，可以通过点击플레이어或自己的计分板来选择要说的话。</p>
                    </div>
                </el-collapse-item>
                <el-collapse-item name="8">
                    <template slot="title">
                        <i class="el-icon-question"></i><span :style="{ 'font-size': fontSize }">Q：SPEED中的方言是？</span>
                    </template>
                    <div>
                        <p :style="{ 'font-size': fontSize }">作者家乡的桂林话及一些自创的术语。其中</p>
                        <p :style="{ 'font-size': fontSize }">洗：通日语「しね」(shi ne)，与叫플레이어받다牌的“받다”一개意思，但表达语气更强烈。</p>
                        <p :style="{ 'font-size': fontSize }">所所所：所，通日语师匠的匠「しょう」(syo)，意为“求师傅”。</p>
                        <p :style="{ 'font-size': fontSize }">卷卷卷：桂林话的“转”，意味“求转向”。</p>
                        <p :style="{ 'font-size': fontSize }">我霉了：霉，桂林话，一般指物理状态的软烂，此处大意为“我人没了”、“我烂掉了”、“我당기기了”。</p>
                        <p :style="{ 'font-size': fontSize }">瘾：桂林话，大意为“过瘾”、“痛快”。</p>
                        <p :style="{ 'font-size': fontSize }">我好方啊：方，桂林话，意思同“慌”。</p>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </el-tab-pane>

        <el-tab-pane label="연락하기" name="contact" lazy>
            <i class="el-icon-info"></i><span :style="{ 'font-size': fontSize }">作者建议</span>
            <p :style="{ 'font-size': fontSize }">如果您遇到问题或Bug，请尽快연락하기解决。同时也欢迎各种技术交流切磋，或针对本网站提出的建设性意见和建议。</p>
            <p :style="{ 'font-size': fontSize }">연락하기时请表明来意，如果是报告问题或Bug请同时提供相应的截图、移动端机型和浏览器类型，谢谢。</p>
            <h1 :style="{ 'font-size': fontSize }"><i class="el-icon-chat-dot-round"></i>社交媒体</h1>
            <hr class="divider-line">
            <el-row :gutter="20">
                <el-col :span="2">
                    <div style="visibility: hidden">123</div>
                </el-col>
                <el-col :span="10">
                    <div style="text-align: center">
                        <p :style="{ 'font-size': fontSize }">微信</p>
                        <el-avatar shape="square" :size="avatarSize + 80"
                            :src="require('@/assets/images/wechat-qr-code-min.png')"></el-avatar>
                    </div>
                </el-col>
                <el-col :span="10">
                    <div style="text-align: center">
                        <p :style="{ 'font-size': fontSize }">line</p>
                        <el-avatar shape="square" :size="avatarSize + 80"
                            :src="require('@/assets/images/line-qr-code-min.png')"></el-avatar>
                    </div>
                </el-col>
                <el-col :span="2">
                    <div></div>
                </el-col>
            </el-row>
            <h1 :style="{ 'font-size': fontSize }"><i class="el-icon-chat-dot-round"></i>전송邮件</h1>
            <hr class="divider-line">
            <span :style="{ 'font-size': fontSize }">email
</span><i class="el-icon-s-promotion"></i>
            <el-link type="info" href="mailto:c4ei.net@gmail.com?subject = Hello">c4ei.net@gmail.com</el-link>
            <h1 :style="{ 'font-size': fontSize }"><i class="el-icon-chat-dot-round"></i>Github</h1>
            <hr class="divider-line">
            <p :style="{ 'font-size': fontSize }">如果您拥有Github账号，您也可以在上面向作者提出issue。</p>
            <span :style="{ 'font-size': fontSize }">前端项目：</span><el-link type="success"
                href="https://github.com/c4ei.net/one_c4ei_net"
                target="_blank">https://github.com/c4ei.net/one_c4ei_net</el-link>
            <br>
            <span :style="{ 'font-size': fontSize }">后端项目：</span><el-link type="warning"
                href="https://github.com/c4ei.net/server-of-poker"
                target="_blank">https://github.com/c4ei.net/server-of-poker</el-link>
            <p :style="{ 'font-size': fontSize }">如果您觉得本网页体验不错，您还可以在Github上给该项目点星<i class="el-icon-star-off"></i>以支持我们，谢谢。
            </p>
        </el-tab-pane>
    </el-tabs>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data() {
        return {
            activeHelpModuleTabName: 'rule',
            activeQuestionNames: ['0'],
        }
    },

    props: {
        fontSize: { type: String, default: '' },
        avatarSize: { type: Number, default: 20 },
        isShowing: { type: Boolean, default: false },
    },

    watch: {
        isShowing: function (newVal: boolean) {
            if (newVal) {
                this.activeHelpModuleTabName = 'rule'
                this.activeQuestionNames = ['0']
            }
        }
    },
})
</script>

<style scoped>
.divider-line {
    background-color: rgb(233, 233, 235);
    height: 1px;
    border: 0;
}
</style>