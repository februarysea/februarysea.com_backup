// set up text to print, each item in array is new line
var aText = new Array(
    "2020年11月15日 09:39​​​​",
    "不知道新鲜感是个什么东西 现在难免会觉得 对方厌倦我 觉得我不可爱的那一天",
    "迟早都会到来 忍不住担心它来得太快​​​​",
    "本来我还想着 哦我要努力一点！努力让别人喜欢我！但这样真的太刻意了 自己恐怕都不会喜欢这样的自己吧",
    "所以就爱谁谁吧 喜欢就来不喜欢就走 我必须得做​​​​我自己了 真正喜欢锤人的人会出现的",
    "2020年11月15日 13:28",
    "看透男的了 叫一句哥哥就能开心半天",
    "2020年11月17日 09:33",
    "早上醒来看到喜欢的人发来的一串消息 心情真的好到爆炸 起床！！​​",
    "2020年11月17日 20:15", 
    "无可救药地陷入爱情叻！喜欢听我夸夸也可爱 分享晴天也可爱 讲话也可爱 笑起来也可爱",
    "2020年11月18日 13:00",
    "​​​​嗯嗯！！！",
    "[图片：https://wx1.sinaimg.cn/mw690/0076xhT1ly1gkt8nkz1tgj30oo061q3o.jpg]",
    "​​​​2020年11月18日 18:15",
    "​​​​元旦去上海真的很危险吗... 我妈刚才直接把我电话挂了 感觉很难说通",
    "​​​​2020年11月19日 15:56",
    "​​​​感叹号人s",
    "​​​​[图片：https://wx3.sinaimg.cn/mw690/0076xhT1ly1gkujdpcxn1j30s31cwtex.jpg]​​",
    "​​​​2020年11月20日 16:04",
    "​​​​分享图片​​​​",
    "​​​​[图片：https://wx2.sinaimg.cn/mw690/0076xhT1ly1gkvp7xb7fpj30u00se77h.jpg]​​",
    "​​​​2020年11月24日 09:48",
    "​​​​昨天就想说的 素颜和喜欢的人视频并不一定是对自己的素颜有多自信",
    "​​​​有可能是因为这个电话确实来的猝不及防 但太想看到他了舍不得不接",
    "​​​​2020年11月24日 23:55",
    "​​​​锤人少女心事新增一则",
    "​​​​一起连麦看电影 讨论里面一个人 我说没有人会不喜欢姐姐吧！就听到他说 我比较喜欢你",
    "​​​​2020年11月27日 00:10​​​​",
    "​​​​睡前随便乱讲",
    "​​​​晚上确实看vlog都能看得我心事重重 但被温柔拯救了！​​​​",
    "​​​​可以毫无顾虑地去分享我那些或许听起来没道理没头脑又杂七杂八的烦恼​​​​",
    "​​​​被认真的对待 不厌其烦地安慰我的敏感 乱乱的一天收尾了！",
    "​​​​每一天都有更多的喜欢​",
    "​​​​2020年11月27日 17:30",
    "​​​​我喜欢的人为什么这么可爱1115555511111",
    "​​​​2020年11月29日 20:03",
    "​​​​跨年的时候要和喜欢的人一起拥抱着看真爱至上",
    "​​​​2020年11月30日 08:24​​​​",
    "​​​​起床了！！喜欢的人打电话喊我起来的 嘿嘿 我可以傻笑一早上",
    "​​​​2020年12月1日 09:15",
    "​​​​12月！！从来没有像现在一样喜欢12月！！是实现愿望的月份！加油！​​​​​​​​",
    "​​​​2020年12月1日 17:35",
    "​​​​喜欢一个人的感觉真的太好了！！",
    "​​​​就是简简单单说说话也会一直忍不住笑 心动得自己都觉得莫名其妙",
    "我甚至都没有想过要求对方也给我同样的感情 光是自己这样喜欢着他就已经很心满意足了！",
    "​​​​2020年12月2日 08:50",
    "​​​​早上好！！​​​​​​​​",
    "​​​​[图片：https://wx1.sinaimg.cn/mw690/0076xhT1ly1gl9847e21mj30s013ujwb.jpg]​​",
    "​​​​[图片：https://wx1.sinaimg.cn/mw690/0076xhT1ly1gl9847lum8j306m06qmxc.jpg]​​",
    "​​​​2020年12月3日 14:01",
    "​​​​呜呜！喜欢的男孩子好用心地帮我计算消耗热量 帮我搞健康饮食的 我也要上点心！",
    "​​​​我现在就是怪极端 想要中午一顿把热量摄入掉 其他时候就忍着 很难熬也不健康",
    "​​​​反正每天都自己做饭的！健康饮食搞起来惹！",
    );
    var iSpeed = 100; // time delay of print out
    var iIndex = 0; // start printing array at this posision
    var iArrLength = aText[0].length; // the length of the text array
    var iScrollAt = 20; // start scrolling up at this many lines
     
    var iTextPos = 0; // initialise text position
    var sContents = ''; // initialise contents variable
    var iRow; // initialise current row
     
    function typewriter()
    {
     sContents =  ' ';
     iRow = Math.max(0, iIndex-iScrollAt);
     var destination = document.getElementById("typedtext");
     
     while ( iRow < iIndex ) {
      sContents += aText[iRow++] + '<br />';
     }
     destination.innerHTML = sContents + aText[iIndex].substring(0, iTextPos) + "_";
     if ( iTextPos++ == iArrLength ) {
      iTextPos = 0;
      iIndex++;
      if ( iIndex != aText.length ) {
       iArrLength = aText[iIndex].length;
       setTimeout("typewriter()", 500);
      }
     } else {
      setTimeout("typewriter()", iSpeed);
     }
    }
    
    
    typewriter();