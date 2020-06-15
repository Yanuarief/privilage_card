var request = require('request');

exports.lists = function(resp,conn,params,res){
    request('https://m.21cineplex.com/gui.schedule.php?sid=&find_by=1&cinema_id=YGYJOCI&movie_id=', function(error, response, html){
        if(html) {
            var regex = /<img.*?src="(http.*?)".*?>\s*<..>\s*<a.>(.*?)<.*?<.*?<.*?>(.*?)<.*?<.*?>(.*?)<.*?>.*?>.*?>.*?>.(.*?)<.*?p_date.*?>.*?>(.*?)<.*?p_price">(.*?)<.*?br>(<p.*?p>)</g;
            var regex2 = /<a.*?(outline.*?").*?>(.*?)</g;
            var matches, matches2, datas = [];

            while (matches = regex.exec(html)) {
                var j = 0;
                var time = [];
                while(matches2 = regex2.exec(matches[8])){
                    time[j] = { time : matches2[2], status : matches2[1].includes('disabled')?'disabled':'enabled'}
                j++;   
                }              

                datas.push({
                    images: matches[1],
                    title: matches[2],
                    tag1: matches[3],
                    tag2: matches[4],
                    duration: matches[5],
                    date: matches[6],
                    price: matches[7],
                    jadwal: time
                });
            }

            var items = {}; 
                items["data"] = datas;
                items["status"] = 200;

            resp.ok(items,res);
        }
    })
}