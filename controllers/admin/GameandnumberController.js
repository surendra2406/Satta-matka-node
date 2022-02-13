const GameandNumberModel =require("../../models/gameAndNumberModel")


exports.singleDigit = async(req, res)=>{
    
    try {
        const result = await GameandNumberModel.singleDigitModel.find({})
        // console.log(result)
        
         const numbers =[0,2,3,4,5,6,7,8,9]
        const data = {type:2,fileName:'game-number/singledigit'}
        res.render('admin_layout/index',{title:"Game & Number",data:data, numbers:result})

    } catch (error) {
        console.log(error)
    }
    

}

exports.jodiDigit =async(req, res)=>{

    try {
        
    // const numbers =[00 ,01, 02, 03, 04 ,05 ,06 ,07, 08, 09 ,10 ,11 ,12 ,13 ,14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25 ,26, 27, 28 ,29 ,30 ,31 ,32 ,33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46 ,47 ,48 ,49 ,50, 51, 52 ,53 ,54 ,55 ,56, 57 ,58, 59, 60 ,61, 62, 63, 64 ,65 ,66 ,67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79 ,80 ,81 ,82 ,83 ,84 ,85 ,86, 87, 88, 89 ,90 ,91 ,92 ,93 ,94, 95, 96, 97, 98, 99]
    const data = {type:2,fileName:'game-number/jodidigit'}
        const result = await GameandNumberModel.jodiDigitModel.find({})
        // console.log(result)
        res.render('admin_layout/index',{title:"",data:data, numbers:result});
        
        
    } catch (error) {
        console.log(error)
    }

}

exports.singlePana =async(req, res)=>{
 
   
   try {
   
        const result = await GameandNumberModel.singlePanaModel.find({})
        // console.log(result)
    const data = {type:2,fileName:'game-number/singlepana'}
    res.render('admin_layout/index',{title:"",data:data, numbers:result })

   } catch (error) {
       console.log(error)
   }
    
}

exports.doublePana =async(req, res)=>{
try {
    const doc = new GameandNumberModel.doublePanaModel({
        // sr_no:0 ,
        // double_pana: [550 ,668 ,244 ,299, 226, 488, 677, 118, 334],
        // sr_no:1 ,
        // double_pana:[100, 119 ,155, 227, 335, 344, 399, 588, 669],
        // sr_no:2 ,
        // double_pana:[200 ,110 ,228, 255 ,336, 499, 660 ,688, 778],
        // sr_no:3 ,
        // double_pana:[300 ,166 ,229 ,337 ,355 ,445 ,599 ,779 ,788] ,
        // sr_no:4 ,
        // double_pana: [400, 112 ,220 ,266 ,338 ,446, 455, 699, 770],
        // sr_no:5 ,
        // double_pana:[500, 113, 122, 177, 339, 366, 447, 799, 889],
        // sr_no:6 ,
        // double_pana:[600, 114, 277, 330, 448, 466, 556, 880, 899],
        // sr_no:7 ,
        // double_pana:[700, 115 ,133 ,188 ,223 ,377 ,449 ,557, 566],
        // sr_no:8 ,
        // double_pana:[800, 116 ,224, 233, 288, 440, 477, 558, 990],
        // sr_no:9 ,
        // double_pana: [900 ,117 ,144 ,199 ,225 ,388 ,559 ,577, 667],

            })
        //    doc.save()
        const result = await GameandNumberModel.doublePanaModel.find({})
        // console.log(result)
        const data = {type:2,fileName:'game-number/doublepana'}
    res.render('admin_layout/index',{title:"",data:data, numbers:result})
         

    
} catch (error) {
    console.log(error)
}
    

}

exports.triplePana =async(req, res)=>{
    // console.log("object")
    try {
        
        //const doc = new GameandNumberModel.TriplePanaModel({
            // triple_pana: ["000"],
           
            // triple_pana: [999],
        // })
         //doc.save()
        const result = await GameandNumberModel.TriplePanaModel.find({})
        console.log(result)
    const data = {type:2,fileName:'game-number/triplepana'}
    res.render('admin_layout/index',{title:"",data:data,numbers:result })
    } catch (error) {
        console.log(error)
    }
    

}

exports.halfSangam =async(req, res)=>{
    try {
        var open_ank = '0 ,1 ,2 ,3 ,4 ,5 ,6 ,7 ,8 ,9';
        var close_ank ='000, 100, 110 ,111, 112, 113, 114 ,115 ,116 ,117 ,118 ,119, 120, 122, 123, 124, 125 ,126, 127, 128, 129, 130 ,133 ,134 ,135 ,136 ,137 ,138, 139, 140, 144 ,145, 146 ,147 ,148, 149, 150, 155 ,156 ,157 ,158, 159, 160, 166 ,167 ,168 ,169 ,170 ,177, 178, 179, 180, 188, 189, 190, 199, 200 ,220, 222, 223, 224, 225, 226, 227 ,228 ,229 ,230, 233, 234, 235 ,236 ,237 ,238 ,239, 240, 244, 245 ,246 ,247 ,248 ,249 ,250 ,255 ,256, 257, 258, 259, 260, 266 ,267 ,268 ,269 ,270 ,277 ,278 ,279, 280, 288, 289, 290, 291 ,292 ,293 ,294 ,295, 296, 297 ,298 ,299 ,300 ,330 ,333 ,334, 335, 336, 337 ,338 ,339, 340, 344, 345, 346 ,347, 348, 349, 350, 355, 356, 357 ,358 ,359, 360, 366 ,367 ,368, 369, 370 ,377 ,378 ,379 ,380 ,388, 389 ,390, 399, 400 ,440 ,444 ,445 ,446 ,447 ,448 ,449 ,450 ,455 ,456 ,457, 458, 459 ,460 ,466 ,467 ,468 ,469 ,470 ,477 ,478 ,479 ,480 ,488 ,489 ,490 ,499, 500 ,550 ,555, 556, 557 ,558, 559, 560, 566, 567 ,568, 569, 570, 577 ,578 ,579 ,580 ,588, 589 ,590 ,591, 592, 593, 594, 595 ,596 ,597, 598 ,599 ,600, 660, 666 ,667, 668 ,669 ,670 ,677 ,678 ,679 ,680, 681, 682 ,683, 684, 685 ,686, 687, 688 ,689 ,690 ,699 ,700 ,770 ,777 ,778, 779, 780, 799 ,800 ,880 ,899 ,900 ,990,999' ;
        

        // var open_string = open_ank.split(",");
        // var openAnkNum = [];
        // for (let index = 0; index < open_string.length; index++) {
        //     const open_ank_num = {
        //         open_ank:open_string[index]
        //     }
        //     openAnkNum.push(open_ank_num)
        // }

        // var close_string = close_ank.split(",");
        // var closeAnkNum = [];
        // for (let index = 0; index < close_string.length; index++) {
        //     const close_ank_num = {
        //         close_ank:close_string[index]
        //     }
        //     closeAnkNum.push(close_ank_num)
        // }

        // const doc = new GameandNumberModel.HalfSangamModel({
        //     half_sangam_open: openAnkNum,
        //     half_sangam_close: closeAnkNum,
        // })
    
        
    const data = {type:2,fileName:'game-number/halfsangam'}
    res.render('admin_layout/index',{title:"",data:data, numbers:num, num2:num2})
    } catch (error) {
        console.log(error)
    }
    }


exports.fullSangam =async(req, res)=>{

    try {
        var open_ank = '000,100,110,111,112,113,114,115,116,117,118,119,120,122,123,124,125,126,127,128,129,130,133,134,135,136,137,138,139,140,144,145,146,147,148,149,150,155,156,157,158,159,160,166,167,168,169,170,177,178,179,180,188,189,190,199,200,220,222,223,224,225,226,227,228,229,230,233,234,235,236,237,238,239,240,244,245,246,247,248,249,250,255,256,257,258,259,260,255,256,257,258,259,260,277,278,279,280,288,289,290,299,300,330,333,334,335,336,337,338,339,340,344,345,346,347,348,349,350,355,356,357,358,359,360,366,367,368,369,370,377,378,379,380,388,389,390,388,389,390,440,444,445,446,447,448,449,450,455,456,457,458,459,460,466,467,468,469,470,477,478,479,480,488,489,490,499,500,550,555,556,557,558,559,560,566,567,568,569,570,577,578,579,580,588,589,590,599,600,660,666,667,668,669,670,677,678,679,680,688,689,690,699,700,770,777,778,779,780,799,800,880,888,889,890,899,900,990,999';

        close_ank = '000,100,110,111,112,113,114,115,116,117,118,119,120,122,123,124,125,126,127,128,129,130,133,134,135,136,137,138,139,140,144,145,146,147,148,149,150,155,156,157,158,159,160,166,167,168,169,170,177,178,179,180,188,189,190,199,200,220,222,223,224,225,226,227,228,229,230,233,234,235,236,237,238,239,240,244,245,246,247,248,249,250,255,256,257,258,259,260,266,267,268,269,270,277,278,279,280,288,289,290,299,300,330,333,334,335,336,337,338,339,340,344,345,346,347,348,349,350,355,356,357,358,359,360,366,367,368,369,370,377,378,379,380,388,389,390,399,400,440,444,445,446,447,448,449,450,455,456,457,458,459,460,466,467,468,469,470,477,478,479,480,488,489,490,499,500,550,555,556,557,558,559,560,566,567,568,569,570,577,578,579,580,588,589,590,599,600,660,666,667,668,669,670,677,678,679,680,688,689,690,699,700,770,777,778,779,780,788,789,790,799,800,880,888,889,890,899,900,990,999';

        // var open_string = open_ank.split(",");
        // var openAnkNum = [];
        // for (let index = 0; index < open_string.length; index++) {
        //     const open_ank_num = {
        //         open_ank:open_string[index]
        //     }
        //     openAnkNum.push(open_ank_num)
        // }

        // var close_string = close_ank.split(",");
        // var closeAnkNum = [];
        // for (let index = 0; index < close_string.length; index++) {
        //     const close_ank_num = {
        //         close_ank:close_string[index]
        //     }
        //     closeAnkNum.push(close_ank_num)
        // }

        // const doc = new GameandNumberModel.FullSangamModel({
        //     full_sangam_open: openAnkNum,
        //     full_sangam_close: closeAnkNum,
        // })
        // console.log(doc);
        // doc.save();
        // let data = await newFullSangamModel.save();
        // console.log(data);
        const result = await GameandNumberModel.FullSangamModel.find({})
        var open_ank =result[0].full_sangam_open
        var close_ank =result[0].full_sangam_close

        const data = {type:2,fileName:'game-number/fullsangam'}
        res.render('admin_layout/index',{title:"",data:data,open_ank,close_ank }) 
        
    } catch (error) {
        console.log(error)
    }
   

}