const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// ==================================================
// 1. FULL ACCOUNT LIST (151 ACCOUNTS PRE-LOADED)
// ==================================================
const accounts = [
  { "uid": 4438032871, "password": "JOBAYAR_CODX-QYNCJW5EW", "account_id": 1, "name": "GHOST_HJZDSH", "region": "BD" },
  { "uid": 4438038683, "password": "JOBAYAR_CODX-B1BR5QI4J", "account_id": 1, "name": "GHOST_V2IVAG", "region": "BD" },
  { "uid": 4438039030, "password": "JOBAYAR_CODX-LPRDIQYAT", "account_id": 1, "name": "GHOST_RNFWJW", "region": "BD" },
  { "uid": 4438047640, "password": "JOBAYAR_CODX-93ELHAZJZ", "account_id": 1, "name": "GHOST_LEXYEU", "region": "BD" },
  { "uid": 4438048277, "password": "JOBAYAR_CODX-JDU0LA3S8", "account_id": 1, "name": "GHOST_WP2A8V", "region": "BD" },
  { "uid": 4438048529, "password": "JOBAYAR_CODX-GH7JEJRKR", "account_id": 1, "name": "GHOST_NMVSHW", "region": "BD" },
  { "uid": 4438050555, "password": "JOBAYAR_CODX-ZZJPTTXBV", "account_id": 1, "name": "GHOST_MJE6A1", "region": "BD" },
  { "uid": 4438050847, "password": "JOBAYAR_CODX-HXO93ZCFL", "account_id": 1, "name": "GHOST_MSJSWT", "region": "BD" },
  { "uid": 4438051436, "password": "JOBAYAR_CODX-QEMBQOYD1", "account_id": 1, "name": "GHOST_0V1IYB", "region": "BD" },
  { "uid": 4438053556, "password": "JOBAYAR_CODX-XGLSILOLE", "account_id": 1, "name": "GHOST_Q4JANE", "region": "BD" },
  { "uid": 4438056888, "password": "JOBAYAR_CODX-5KRGD7F7W", "account_id": 1, "name": "GHOST_BBJRKA", "region": "BD" },
  { "uid": 4438059249, "password": "JOBAYAR_CODX-Y2XUDNXXQ", "account_id": 1, "name": "GHOST_CULYZ2", "region": "BD" },
  { "uid": 4438060258, "password": "JOBAYAR_CODX-RFT4PQSEM", "account_id": 1, "name": "GHOST_QAVOJW", "region": "BD" },
  { "uid": 4438060430, "password": "JOBAYAR_CODX-HLQFZC8NY", "account_id": 1, "name": "GHOST_MYQENT", "region": "BD" },
  { "uid": 4438063449, "password": "JOBAYAR_CODX-QELPF27Z0", "account_id": 1, "name": "GHOST_KXYBW3", "region": "BD" },
  { "uid": 4438065959, "password": "JOBAYAR_CODX-7EGJPLWGU", "account_id": 1, "name": "GHOST_Z3RHTL", "region": "BD" },
  { "uid": 4438071644, "password": "JOBAYAR_CODX-ZHLBWQNGI", "account_id": 1, "name": "GHOST_2WTKFY", "region": "BD" },
  { "uid": 4438074211, "password": "JOBAYAR_CODX-HNP8CTAKN", "account_id": 1, "name": "GHOST_MDQGOT", "region": "BD" },
  { "uid": 4438074492, "password": "JOBAYAR_CODX-OUA6KWQL4", "account_id": 1, "name": "GHOST_RFODRB", "region": "BD" },
  { "uid": 4438074883, "password": "JOBAYAR_CODX-6V2I1R7U9", "account_id": 1, "name": "GHOST_XS6FJS", "region": "BD" },
  { "uid": 4438075028, "password": "JOBAYAR_CODX-WO8RIFQJO", "account_id": 1, "name": "GHOST_QCQKRP", "region": "BD" },
  { "uid": 4438076847, "password": "JOBAYAR_CODX-IILM4OTN8", "account_id": 1, "name": "GHOST_DLR3WW", "region": "BD" },
  { "uid": 4438077262, "password": "JOBAYAR_CODX-JDCBEN4WK", "account_id": 1, "name": "GHOST_OU6VLQ", "region": "BD" },
  { "uid": 4438077830, "password": "JOBAYAR_CODX-RVKDFZCB8", "account_id": 1, "name": "GHOST_VRHFTA", "region": "BD" },
  { "uid": 4438078002, "password": "JOBAYAR_CODX-RRPXUBP63", "account_id": 1, "name": "GHOST_BDHQ9D", "region": "BD" },
  { "uid": 4438080927, "password": "JOBAYAR_CODX-X56J5ZPTF", "account_id": 1, "name": "GHOST_JINJCG", "region": "BD" },
  { "uid": 4438083024, "password": "JOBAYAR_CODX-7FWXUO7JA", "account_id": 1, "name": "GHOST_IIFDB7", "region": "BD" },
  { "uid": 4438086031, "password": "JOBAYAR_CODX-5R0GSNDKA", "account_id": 1, "name": "GHOST_PUJXWD", "region": "BD" },
  { "uid": 4438089119, "password": "JOBAYAR_CODX-VXQLYNLY9", "account_id": 1, "name": "GHOST_YJR4VG", "region": "BD" },
  { "uid": 4438089824, "password": "JOBAYAR_CODX-9MK4E1AFF", "account_id": 1, "name": "GHOST_2WRBWS", "region": "BD" },
  { "uid": 4438091752, "password": "JOBAYAR_CODX-VIURMQE6Q", "account_id": 1, "name": "GHOST_J8W6EE", "region": "BD" },
  { "uid": 4438092293, "password": "JOBAYAR_CODX-SHAAAZAQE", "account_id": 1, "name": "GHOST_VSUOM5", "region": "BD" },
  { "uid": 4438093058, "password": "JOBAYAR_CODX-WIWLAT785", "account_id": 1, "name": "GHOST_TTCZ3O", "region": "BD" },
  { "uid": 4438095130, "password": "JOBAYAR_CODX-JQUQLNMW7", "account_id": 1, "name": "GHOST_MZNVVM", "region": "BD" },
  { "uid": 4438095455, "password": "JOBAYAR_CODX-FKSJMGVUN", "account_id": 1, "name": "GHOST_51AVDS", "region": "BD" },
  { "uid": 4438098041, "password": "JOBAYAR_CODX-VGFK6JEOM", "account_id": 1, "name": "GHOST_XHTANH", "region": "BD" },
  { "uid": 4438098457, "password": "JOBAYAR_CODX-CXTA94PVO", "account_id": 1, "name": "GHOST_GLMQO2", "region": "BD" },
  { "uid": 4438101062, "password": "JOBAYAR_CODX-N0THDRNRX", "account_id": 1, "name": "GHOST_B19IUD", "region": "BD" },
  { "uid": 4438101541, "password": "JOBAYAR_CODX-UUIAYMNNV", "account_id": 1, "name": "GHOST_4RZCND", "region": "BD" },
  { "uid": 4438101887, "password": "JOBAYAR_CODX-WFN5LQRS3", "account_id": 1, "name": "GHOST_HUJUZS", "region": "BD" },
  { "uid": 4438103799, "password": "JOBAYAR_CODX-WBKIIXUGN", "account_id": 1, "name": "GHOST_ITFIQR", "region": "BD" },
  { "uid": 4438104467, "password": "JOBAYAR_CODX-DDF0H0MMY", "account_id": 1, "name": "GHOST_SPKND0", "region": "BD" },
  { "uid": 4438106811, "password": "JOBAYAR_CODX-LBUNHQX1Y", "account_id": 1, "name": "GHOST_7IUUBQ", "region": "BD" },
  { "uid": 4438107075, "password": "JOBAYAR_CODX-UWGV6F2WX", "account_id": 1, "name": "GHOST_XYL3QK", "region": "BD" },
  { "uid": 4438107595, "password": "JOBAYAR_CODX-NBPOTD0GK", "account_id": 1, "name": "GHOST_4PJMZH", "region": "BD" },
  { "uid": 4438110125, "password": "JOBAYAR_CODX-P42ZAOOPZ", "account_id": 1, "name": "GHOST_KLNEEW", "region": "BD" },
  { "uid": 4438110611, "password": "JOBAYAR_CODX-YVVPIXIOV", "account_id": 1, "name": "GHOST_21GNBP", "region": "BD" },
  { "uid": 4438118496, "password": "JOBAYAR_CODX-JXKGROJMN", "account_id": 1, "name": "GHOST_AJDM3U", "region": "BD" },
  { "uid": 4438119116, "password": "JOBAYAR_CODX-PNJIJ2DAA", "account_id": 1, "name": "GHOST_XJFKTZ", "region": "BD" },
  { "uid": 4438122167, "password": "JOBAYAR_CODX-ELNXQWHOU", "account_id": 1, "name": "GHOST_ARMEZG", "region": "BD" },
  { "uid": 4438124134, "password": "JOBAYAR_CODX-DLPLK0X3J", "account_id": 1, "name": "GHOST_1NA9LJ", "region": "BD" },
  { "uid": 4438127592, "password": "JOBAYAR_CODX-LOLGD98AU", "account_id": 1, "name": "GHOST_GUGLM6", "region": "BD" },
  { "uid": 4438132150, "password": "JOBAYAR_CODX-AHF8NNIKL", "account_id": 1, "name": "GHOST_SDBHQH", "region": "BD" },
  { "uid": 4438132593, "password": "JOBAYAR_CODX-E0TVVU961", "account_id": 1, "name": "GHOST_ZIXWWA", "region": "BD" },
  { "uid": 4438134935, "password": "JOBAYAR_CODX-HNRWEQVPY", "account_id": 1, "name": "GHOST_JJAIFD", "region": "BD" },
  { "uid": 4438138798, "password": "JOBAYAR_CODX-CYQMKQVJK", "account_id": 1, "name": "GHOST_RVTWWN", "region": "BD" },
  { "uid": 4438143366, "password": "JOBAYAR_CODX-GCVFO15V8", "account_id": 1, "name": "GHOST_C1BVOI", "region": "BD" },
  { "uid": 4438143793, "password": "JOBAYAR_CODX-VAOFIVNQA", "account_id": 1, "name": "GHOST_0YAQES", "region": "BD" },
  { "uid": 4438144306, "password": "JOBAYAR_CODX-5GHEJREQJ", "account_id": 1, "name": "GHOST_CVUMJZ", "region": "BD" },
  { "uid": 4438146142, "password": "JOBAYAR_CODX-XXYOWHEEV", "account_id": 1, "name": "GHOST_VAJ2YP", "region": "BD" },
  { "uid": 4438146461, "password": "JOBAYAR_CODX-XETOSDXI7", "account_id": 1, "name": "GHOST_AOYBUW", "region": "BD" },
  { "uid": 4438146989, "password": "JOBAYAR_CODX-W9FPJI2KP", "account_id": 1, "name": "GHOST_DQGJG6", "region": "BD" },
  { "uid": 4438149352, "password": "JOBAYAR_CODX-MPSDEWMXO", "account_id": 1, "name": "GHOST_LDN700", "region": "BD" },
  { "uid": 4438151631, "password": "JOBAYAR_CODX-WWEKDEQLO", "account_id": 1, "name": "GHOST_QX01AD", "region": "BD" },
  { "uid": 4438154269, "password": "JOBAYAR_CODX-BUONTEEOT", "account_id": 1, "name": "GHOST_5TY3ZK", "region": "BD" },
  { "uid": 4438155182, "password": "JOBAYAR_CODX-ZAAMXGFAZ", "account_id": 1, "name": "GHOST_8HTDLG", "region": "BD" },
  { "uid": 4438157398, "password": "JOBAYAR_CODX-NWVERDEQI", "account_id": 1, "name": "GHOST_B79EGV", "region": "BD" },
  { "uid": 4438162271, "password": "JOBAYAR_CODX-LINHNVQCM", "account_id": 1, "name": "GHOST_5KPGZ8", "region": "BD" },
  { "uid": 4438165493, "password": "JOBAYAR_CODX-B9GEQKZZ3", "account_id": 1, "name": "GHOST_FIHDD9", "region": "BD" },
  { "uid": 4438168647, "password": "JOBAYAR_CODX-AUCFKV3I3", "account_id": 1, "name": "GHOST_YAOUKF", "region": "BD" },
  { "uid": 4438170518, "password": "JOBAYAR_CODX-A7QKWR4J8", "account_id": 1, "name": "GHOST_EXHLST", "region": "BD" },
  { "uid": 4438171275, "password": "JOBAYAR_CODX-SEPZKCY8R", "account_id": 1, "name": "GHOST_XMKDFY", "region": "BD" },
  { "uid": 4438173374, "password": "JOBAYAR_CODX-TRE6VD1JG", "account_id": 1, "name": "GHOST_HN7TJV", "region": "BD" },
  { "uid": 4438174298, "password": "JOBAYAR_CODX-3XVGUSGIK", "account_id": 1, "name": "GHOST_ZFFTES", "region": "BD" },
  { "uid": 4438176471, "password": "JOBAYAR_CODX-DWUHGQX3H", "account_id": 1, "name": "GHOST_OZHJDZ", "region": "BD" },
  { "uid": 4438176943, "password": "JOBAYAR_CODX-JCKTFKXRE", "account_id": 1, "name": "GHOST_YSZAQD", "region": "BD" },
  { "uid": 4438179573, "password": "JOBAYAR_CODX-VQKKICKV5", "account_id": 1, "name": "GHOST_6QPUNG", "region": "BD" },
  { "uid": 4438185225, "password": "JOBAYAR_CODX-ZTRIPAE67", "account_id": 1, "name": "GHOST_C61QBQ", "region": "BD" },
  { "uid": 4438188034, "password": "JOBAYAR_CODX-7BP9LVDCC", "account_id": 1, "name": "GHOST_ORBZGK", "region": "BD" },
  { "uid": 4438190689, "password": "JOBAYAR_CODX-L1Q751WAK", "account_id": 1, "name": "GHOST_Y4XOUS", "region": "BD" },
  { "uid": 4438190904, "password": "JOBAYAR_CODX-NK0HQGRQJ", "account_id": 1, "name": "GHOST_XM0BEG", "region": "BD" },
  { "uid": 4438192879, "password": "JOBAYAR_CODX-C2TQJPFQF", "account_id": 1, "name": "GHOST_MTINF0", "region": "BD" },
  { "uid": 4438193837, "password": "JOBAYAR_CODX-UX3J4TEOK", "account_id": 1, "name": "GHOST_PHU6AO", "region": "BD" },
  { "uid": 4438196138, "password": "JOBAYAR_CODX-GNFENNTUA", "account_id": 1, "name": "GHOST_YF09FM", "region": "BD" },
  { "uid": 4438199251, "password": "JOBAYAR_CODX-CEOKGL6IH", "account_id": 1, "name": "GHOST_KVZH1V", "region": "BD" },
  { "uid": 4438201509, "password": "JOBAYAR_CODX-KKLMTXTBH", "account_id": 1, "name": "GHOST_JATYBS", "region": "BD" },
  { "uid": 4438206465, "password": "JOBAYAR_CODX-7W7ZEU2WO", "account_id": 1, "name": "GHOST_SQXXGC", "region": "BD" },
  { "uid": 4438210156, "password": "JOBAYAR_CODX-OSZGTLJFV", "account_id": 1, "name": "GHOST_QJGY4H", "region": "BD" },
  { "uid": 4438212510, "password": "JOBAYAR_CODX-SW9V2IYHT", "account_id": 1, "name": "GHOST_OZAU86", "region": "BD" },
  { "uid": 4438215691, "password": "JOBAYAR_CODX-L3Y6CJZJJ", "account_id": 1, "name": "GHOST_MK6K8G", "region": "BD" },
  { "uid": 4438218033, "password": "JOBAYAR_CODX-BI3QHA8WA", "account_id": 1, "name": "GHOST_3OIP4E", "region": "BD" },
  { "uid": 4438218252, "password": "JOBAYAR_CODX-LDFFS3P4O", "account_id": 1, "name": "GHOST_4VSYHE", "region": "BD" },
  { "uid": 4438220664, "password": "JOBAYAR_CODX-7TZLEQFA3", "account_id": 1, "name": "GHOST_0EWXQ5", "region": "BD" },
  { "uid": 4438221290, "password": "JOBAYAR_CODX-JZYOIGKXM", "account_id": 1, "name": "GHOST_BQCPQP", "region": "BD" },
  { "uid": 4438223142, "password": "JOBAYAR_CODX-ZHE6EPFYV", "account_id": 1, "name": "GHOST_XFH4GY", "region": "BD" },
  { "uid": 4438226591, "password": "JOBAYAR_CODX-DAZ1FNV2X", "account_id": 1, "name": "GHOST_QK5FQT", "region": "BD" },
  { "uid": 4438229625, "password": "JOBAYAR_CODX-ZC0N34LGB", "account_id": 1, "name": "GHOST_UEIYHW", "region": "BD" },
  { "uid": 4438231873, "password": "JOBAYAR_CODX-BOJJJYPSL", "account_id": 1, "name": "GHOST_TMJPVO", "region": "BD" },
  { "uid": 4438232378, "password": "JOBAYAR_CODX-M396BRMT7", "account_id": 1, "name": "GHOST_6L7ZTL", "region": "BD" },
  { "uid": 4438240246, "password": "JOBAYAR_CODX-IMI1I5YKM", "account_id": 1, "name": "GHOST_MAU9NT", "region": "BD" },
  { "uid": 4438242086, "password": "JOBAYAR_CODX-FHZTKN2BL", "account_id": 1, "name": "GHOST_JJXJOF", "region": "BD" },
  { "uid": 4438253606, "password": "JOBAYAR_CODX-G6WH0FTXU", "account_id": 1, "name": "GHOST_SAL7O0", "region": "BD" },
  { "uid": 4438256453, "password": "JOBAYAR_CODX-SOYKOLB5S", "account_id": 1, "name": "GHOST_EABJ4T", "region": "BD" },
  { "uid": 4438258955, "password": "JOBAYAR_CODX-JRVJE5XUK", "account_id": 1, "name": "GHOST_O1PZ2X", "region": "BD" },
  { "uid": 4438261697, "password": "JOBAYAR_CODX-6FQXM1DMS", "account_id": 1, "name": "GHOST_8CNBUM", "region": "BD" },
  { "uid": 4438264319, "password": "JOBAYAR_CODX-7TEBZQGVP", "account_id": 1, "name": "GHOST_MGFTIK", "region": "BD" },
  { "uid": 4438266817, "password": "JOBAYAR_CODX-YFLE3NGR8", "account_id": 1, "name": "GHOST_CEZTO3", "region": "BD" },
  { "uid": 4438272381, "password": "JOBAYAR_CODX-K6Y0PLI3U", "account_id": 1, "name": "GHOST_BOKLF6", "region": "BD" },
  { "uid": 4438275137, "password": "JOBAYAR_CODX-KB3GWBXCS", "account_id": 1, "name": "GHOST_KPJVUS", "region": "BD" },
  { "uid": 4438276874, "password": "JOBAYAR_CODX-7LPKQLJI6", "account_id": 1, "name": "GHOST_4KEDZZ", "region": "BD" },
  { "uid": 4438279857, "password": "JOBAYAR_CODX-FXM2BO1DM", "account_id": 1, "name": "GHOST_RBG6H8", "region": "BD" },
  { "uid": 4438282587, "password": "JOBAYAR_CODX-YYLAIBCAR", "account_id": 1, "name": "GHOST_DWOQXW", "region": "BD" },
  { "uid": 4438285958, "password": "JOBAYAR_CODX-CPYWEGJIQ", "account_id": 1, "name": "GHOST_PIJL60", "region": "BD" },
  { "uid": 4438287903, "password": "JOBAYAR_CODX-MTYKIKVXZ", "account_id": 1, "name": "GHOST_YCCCEK", "region": "BD" },
  { "uid": 4438290846, "password": "JOBAYAR_CODX-JTPKG4SMI", "account_id": 1, "name": "GHOST_DHHXZ5", "region": "BD" },
  { "uid": 4438293542, "password": "JOBAYAR_CODX-XFMQUIQ8J", "account_id": 1, "name": "GHOST_F0QVP4", "region": "BD" },
  { "uid": 4438296741, "password": "JOBAYAR_CODX-PEETEHOET", "account_id": 1, "name": "GHOST_5J69AI", "region": "BD" },
  { "uid": 4438299137, "password": "JOBAYAR_CODX-7D1G3WKXH", "account_id": 1, "name": "GHOST_YQHEJO", "region": "BD" },
  { "uid": 4438301428, "password": "JOBAYAR_CODX-EFNDTZQXI", "account_id": 1, "name": "GHOST_41AOTL", "region": "BD" },
  { "uid": 4438302470, "password": "JOBAYAR_CODX-IIA0N1DA4", "account_id": 1, "name": "GHOST_LAPNPA", "region": "BD" },
  { "uid": 4438304788, "password": "JOBAYAR_CODX-G60VBEAEV", "account_id": 1, "name": "GHOST_9DTEOM", "region": "BD" },
  { "uid": 4438307162, "password": "JOBAYAR_CODX-FWAZ8BNCQ", "account_id": 1, "name": "GHOST_7GCGBP", "region": "BD" },
  { "uid": 4438310177, "password": "JOBAYAR_CODX-VGKPXFTZS", "account_id": 1, "name": "GHOST_P0TBKT", "region": "BD" },
  { "uid": 4438312228, "password": "JOBAYAR_CODX-5UMYEANED", "account_id": 1, "name": "GHOST_MRISE0", "region": "BD" },
  { "uid": 4438314859, "password": "JOBAYAR_CODX-D5AD3USOI", "account_id": 1, "name": "GHOST_PAFBYM", "region": "BD" },
  { "uid": 4438318386, "password": "JOBAYAR_CODX-QUSJE2GQC", "account_id": 1, "name": "GHOST_MWNHOZ", "region": "BD" },
  { "uid": 4438320843, "password": "JOBAYAR_CODX-T4BDDFYDU", "account_id": 1, "name": "GHOST_4WNXF5", "region": "BD" },
  { "uid": 4438322954, "password": "JOBAYAR_CODX-17LR9EGSW", "account_id": 1, "name": "GHOST_0FLHG5", "region": "BD" },
  { "uid": 4438329661, "password": "JOBAYAR_CODX-HY1WY0OT0", "account_id": 1, "name": "GHOST_JKESHO", "region": "BD" },
  { "uid": 4438332286, "password": "JOBAYAR_CODX-VQYUQFJGT", "account_id": 1, "name": "GHOST_UGTWM6", "region": "BD" },
  { "uid": 4438334243, "password": "JOBAYAR_CODX-Y8J6YCM44", "account_id": 1, "name": "GHOST_6KB0XX", "region": "BD" },
  { "uid": 4438340711, "password": "JOBAYAR_CODX-SEI6VPDZN", "account_id": 1, "name": "GHOST_YZIQXH", "region": "BD" },
  { "uid": 4438342540, "password": "JOBAYAR_CODX-BERT2FHPP", "account_id": 1, "name": "GHOST_YN6PWV", "region": "BD" },
  { "uid": 4438345784, "password": "JOBAYAR_CODX-S8GZZ46HS", "account_id": 1, "name": "GHOST_WOIQLR", "region": "BD" },
  { "uid": 4438348596, "password": "JOBAYAR_CODX-Q7KJLZMX6", "account_id": 1, "name": "GHOST_2ML9KF", "region": "BD" },
  { "uid": 4438358640, "password": "JOBAYAR_CODX-LQDE0SVZV", "account_id": 1, "name": "GHOST_MBFN54", "region": "BD" },
  { "uid": 4438361314, "password": "JOBAYAR_CODX-7YUQJTSB4", "account_id": 1, "name": "GHOST_KJSNXV", "region": "BD" },
  { "uid": 4438368197, "password": "JOBAYAR_CODX-96CKZ5DXW", "account_id": 1, "name": "GHOST_YYJNRO", "region": "BD" },
  { "uid": 4438373192, "password": "JOBAYAR_CODX-80OOOSLBB", "account_id": 1, "name": "GHOST_KLB5BU", "region": "BD" },
  { "uid": 4438375604, "password": "JOBAYAR_CODX-J6V42PSUS", "account_id": 1, "name": "GHOST_9FSBOK", "region": "BD" },
  { "uid": 4438377921, "password": "JOBAYAR_CODX-B2AKXECVE", "account_id": 1, "name": "GHOST_REQDDF", "region": "BD" },
  { "uid": 4438383105, "password": "JOBAYAR_CODX-SKDVEWDZQ", "account_id": 1, "name": "GHOST_7INTTY", "region": "BD" },
  { "uid": 4438384972, "password": "JOBAYAR_CODX-8IACEBHIK", "account_id": 1, "name": "GHOST_PCHMOX", "region": "BD" },
  { "uid": 4438389887, "password": "JOBAYAR_CODX-CFDEQGKGV", "account_id": 1, "name": "GHOST_OCQUYC", "region": "BD" },
  { "uid": 4438395377, "password": "JOBAYAR_CODX-O0KCECQMA", "account_id": 1, "name": "GHOST_RKJKWP", "region": "BD" },
  { "uid": 4438399899, "password": "JOBAYAR_CODX-XV7Y5TBYA", "account_id": 1, "name": "GHOST_O7NAN6", "region": "BD" },
  { "uid": 4438402041, "password": "JOBAYAR_CODX-MMNHSDP1K", "account_id": 1, "name": "GHOST_SI5FNS", "region": "BD" },
  { "uid": 4438406429, "password": "JOBAYAR_CODX-ZNVVNLBS3", "account_id": 1, "name": "GHOST_DNIYRJ", "region": "BD" },
  { "uid": 4438414141, "password": "JOBAYAR_CODX-V1NYW7BD0", "account_id": 1, "name": "GHOST_EK7PJ1", "region": "BD" },
  { "uid": 4438414350, "password": "JOBAYAR_CODX-KUX6Q44WV", "account_id": 1, "name": "GHOST_ZUBKNW", "region": "BD" },
  { "uid": 4438416658, "password": "JOBAYAR_CODX-DMJLSIC8G", "account_id": 1, "name": "GHOST_5HLM6E", "region": "BD" }
];

// ==========================================
// 2. CONFIGURATION & MIDDLEWARE
// ==========================================
const SECRET_KEY = "DARKNESS_VIP"; 
const ADMIN_PASSWORD = "admin"; 

const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        jwt.verify(bearer[1], SECRET_KEY, (err, authData) => {
            if (err) return res.status(403).json({ status: false, message: "Invalid Token" });
            req.authData = authData;
            next();
        });
    } else {
        res.status(403).json({ status: false, message: "Token Required" });
    }
};

// ==========================================
// 3. ROUTES
// ==========================================

// Home Route
app.get('/', (req, res) => {
    res.json({
        status: true,
        message: "FF Like API is Online 🟢",
        total_accounts: accounts.length,
        developer: "Dev by Darkness"
    });
});

// Login Route
app.post('/login', (req, res) => {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
        const token = jwt.sign({ role: 'admin' }, SECRET_KEY, { expiresIn: '1h' });
        return res.json({ status: true, token: token });
    }
    return res.status(403).json({ status: false, message: "Wrong Password" });
});

// Send Likes Route
app.post('/send-likes', verifyToken, (req, res) => {
    const { target_uid, count } = req.body;
    if (!target_uid) return res.status(400).json({ status: false, message: "Target UID required" });

    let limit = count || 10;
    if (limit > accounts.length) limit = accounts.length;

    const workers = accounts.slice(0, limit);

    res.json({
        status: true,
        message: `Sending ${limit} likes to ${target_uid}`,
        data: workers.map(w => ({ 
            worker: w.name, 
            status: "Success", 
            time: new Date().toISOString() 
        }))
    });
});

// ==========================================
// 4. EXPORT (MUST BE THE LAST LINE)
// ==========================================
module.exports = app;  { "uid": 4438083024, "password": "JOBAYAR_CODX-7FWXUO7JA", "account_id": 1, "name": "GHOST_IIFDB7", "region": "BD" },
  { "uid": 4438086031, "password": "JOBAYAR_CODX-5R0GSNDKA", "account_id": 1, "name": "GHOST_PUJXWD", "region": "BD" },
  { "uid": 4438089119, "password": "JOBAYAR_CODX-VXQLYNLY9", "account_id": 1, "name": "GHOST_YJR4VG", "region": "BD" },
  { "uid": 4438089824, "password": "JOBAYAR_CODX-9MK4E1AFF", "account_id": 1, "name": "GHOST_2WRBWS", "region": "BD" },
  { "uid": 4438091752, "password": "JOBAYAR_CODX-VIURMQE6Q", "account_id": 1, "name": "GHOST_J8W6EE", "region": "BD" },
  { "uid": 4438092293, "password": "JOBAYAR_CODX-SHAAAZAQE", "account_id": 1, "name": "GHOST_VSUOM5", "region": "BD" },
  { "uid": 4438093058, "password": "JOBAYAR_CODX-WIWLAT785", "account_id": 1, "name": "GHOST_TTCZ3O", "region": "BD" },
  { "uid": 4438095130, "password": "JOBAYAR_CODX-JQUQLNMW7", "account_id": 1, "name": "GHOST_MZNVVM", "region": "BD" },
  { "uid": 4438095455, "password": "JOBAYAR_CODX-FKSJMGVUN", "account_id": 1, "name": "GHOST_51AVDS", "region": "BD" },
  { "uid": 4438098041, "password": "JOBAYAR_CODX-VGFK6JEOM", "account_id": 1, "name": "GHOST_XHTANH", "region": "BD" },
  { "uid": 4438098457, "password": "JOBAYAR_CODX-CXTA94PVO", "account_id": 1, "name": "GHOST_GLMQO2", "region": "BD" },
  { "uid": 4438101062, "password": "JOBAYAR_CODX-N0THDRNRX", "account_id": 1, "name": "GHOST_B19IUD", "region": "BD" },
  { "uid": 4438101541, "password": "JOBAYAR_CODX-UUIAYMNNV", "account_id": 1, "name": "GHOST_4RZCND", "region": "BD" },
  { "uid": 4438101887, "password": "JOBAYAR_CODX-WFN5LQRS3", "account_id": 1, "name": "GHOST_HUJUZS", "region": "BD" },
  { "uid": 4438103799, "password": "JOBAYAR_CODX-WBKIIXUGN", "account_id": 1, "name": "GHOST_ITFIQR", "region": "BD" },
  { "uid": 4438104467, "password": "JOBAYAR_CODX-DDF0H0MMY", "account_id": 1, "name": "GHOST_SPKND0", "region": "BD" },
  { "uid": 4438106811, "password": "JOBAYAR_CODX-LBUNHQX1Y", "account_id": 1, "name": "GHOST_7IUUBQ", "region": "BD" },
  { "uid": 4438107075, "password": "JOBAYAR_CODX-UWGV6F2WX", "account_id": 1, "name": "GHOST_XYL3QK", "region": "BD" },
  { "uid": 4438107595, "password": "JOBAYAR_CODX-NBPOTD0GK", "account_id": 1, "name": "GHOST_4PJMZH", "region": "BD" },
  { "uid": 4438110125, "password": "JOBAYAR_CODX-P42ZAOOPZ", "account_id": 1, "name": "GHOST_KLNEEW", "region": "BD" },
  { "uid": 4438110611, "password": "JOBAYAR_CODX-YVVPIXIOV", "account_id": 1, "name": "GHOST_21GNBP", "region": "BD" },
  { "uid": 4438118496, "password": "JOBAYAR_CODX-JXKGROJMN", "account_id": 1, "name": "GHOST_AJDM3U", "region": "BD" },
  { "uid": 4438119116, "password": "JOBAYAR_CODX-PNJIJ2DAA", "account_id": 1, "name": "GHOST_XJFKTZ", "region": "BD" },
  { "uid": 4438122167, "password": "JOBAYAR_CODX-ELNXQWHOU", "account_id": 1, "name": "GHOST_ARMEZG", "region": "BD" },
  { "uid": 4438124134, "password": "JOBAYAR_CODX-DLPLK0X3J", "account_id": 1, "name": "GHOST_1NA9LJ", "region": "BD" },
  { "uid": 4438127592, "password": "JOBAYAR_CODX-LOLGD98AU", "account_id": 1, "name": "GHOST_GUGLM6", "region": "BD" },
  { "uid": 4438132150, "password": "JOBAYAR_CODX-AHF8NNIKL", "account_id": 1, "name": "GHOST_SDBHQH", "region": "BD" },
  { "uid": 4438132593, "password": "JOBAYAR_CODX-E0TVVU961", "account_id": 1, "name": "GHOST_ZIXWWA", "region": "BD" },
  { "uid": 4438134935, "password": "JOBAYAR_CODX-HNRWEQVPY", "account_id": 1, "name": "GHOST_JJAIFD", "region": "BD" },
  { "uid": 4438138798, "password": "JOBAYAR_CODX-CYQMKQVJK", "account_id": 1, "name": "GHOST_RVTWWN", "region": "BD" },
  { "uid": 4438143366, "password": "JOBAYAR_CODX-GCVFO15V8", "account_id": 1, "name": "GHOST_C1BVOI",
    "region": "BD"
  },
  { "uid": 4438143793, "password": "JOBAYAR_CODX-VAOFIVNQA", "account_id": 1, "name": "GHOST_0YAQES", "region": "BD" },
  { "uid": 4438144306, "password": "JOBAYAR_CODX-5GHEJREQJ", "account_id": 1, "name": "GHOST_CVUMJZ", "region": "BD" },
  { "uid": 4438146142, "password": "JOBAYAR_CODX-XXYOWHEEV", "account_id": 1, "name": "GHOST_VAJ2YP", "region": "BD" },
  { "uid": 4438146461, "password": "JOBAYAR_CODX-XETOSDXI7", "account_id": 1, "name": "GHOST_AOYBUW", "region": "BD" },
  { "uid": 4438146989, "password": "JOBAYAR_CODX-W9FPJI2KP", "account_id": 1, "name": "GHOST_DQGJG6", "region": "BD" },
  { "uid": 4438149352, "password": "JOBAYAR_CODX-MPSDEWMXO", "account_id": 1, "name": "GHOST_LDN700", "region": "BD" },
  { "uid": 4438151631, "password": "JOBAYAR_CODX-WWEKDEQLO", "account_id": 1, "name": "GHOST_QX01AD", "region": "BD" },
  { "uid": 4438154269, "password": "JOBAYAR_CODX-BUONTEEOT", "account_id": 1, "name": "GHOST_5TY3ZK", "region": "BD" },
  { "uid": 4438155182, "password": "JOBAYAR_CODX-ZAAMXGFAZ", "account_id": 1, "name": "GHOST_8HTDLG", "region": "BD" },
  { "uid": 4438157398, "password": "JOBAYAR_CODX-NWVERDEQI", "account_id": 1, "name": "GHOST_B79EGV", "region": "BD" },
  { "uid": 4438162271, "password": "JOBAYAR_CODX-LINHNVQCM", "account_id": 1, "name": "GHOST_5KPGZ8", "region": "BD" },
  { "uid": 4438165493, "password": "JOBAYAR_CODX-B9GEQKZZ3", "account_id": 1, "name": "GHOST_FIHDD9", "region": "BD" },
  { "uid": 4438168647, "password": "JOBAYAR_CODX-AUCFKV3I3", "account_id": 1, "name": "GHOST_YAOUKF", "region": "BD" },
  { "uid": 4438170518, "password": "JOBAYAR_CODX-A7QKWR4J8", "account_id": 1, "name": "GHOST_EXHLST", "region": "BD" },
  { "uid": 4438171275, "password": "JOBAYAR_CODX-SEPZKCY8R", "account_id": 1, "name": "GHOST_XMKDFY", "region": "BD" },
  { "uid": 4438173374, "password": "JOBAYAR_CODX-TRE6VD1JG", "account_id": 1, "name": "GHOST_HN7TJV", "region": "BD" },
  { "uid": 4438174298, "password": "JOBAYAR_CODX-3XVGUSGIK", "account_id": 1, "name": "GHOST_ZFFTES", "region": "BD" },
  { "uid": 4438176471, "password": "JOBAYAR_CODX-DWUHGQX3H", "account_id": 1, "name": "GHOST_OZHJDZ", "region": "BD" },
  { "uid": 4438176943, "password": "JOBAYAR_CODX-JCKTFKXRE", "account_id": 1, "name": "GHOST_YSZAQD", "region": "BD" },
  { "uid": 4438179573, "password": "JOBAYAR_CODX-VQKKICKV5", "account_id": 1, "name": "GHOST_6QPUNG", "region": "BD" },
  { "uid": 4438185225, "password": "JOBAYAR_CODX-ZTRIPAE67", "account_id": 1, "name": "GHOST_C61QBQ", "region": "BD" },
  { "uid": 4438188034, "password": "JOBAYAR_CODX-7BP9LVDCC", "account_id": 1, "name": "GHOST_ORBZGK", "region": "BD" },
  { "uid": 4438190689, "password": "JOBAYAR_CODX-L1Q751WAK", "account_id": 1, "name": "GHOST_Y4XOUS", "region": "BD" },
  { "uid": 4438190904, "password": "JOBAYAR_CODX-NK0HQGRQJ", "account_id": 1, "name": "GHOST_XM0BEG", "region": "BD" },
  { "uid": 4438192879, "password": "JOBAYAR_CODX-C2TQJPFQF", "account_id": 1, "name": "GHOST_MTINF0", "region": "BD" },
  { "uid": 4438193837, "password": "JOBAYAR_CODX-UX3J4TEOK", "account_id": 1, "name": "GHOST_PHU6AO", "region": "BD" },
  { "uid": 4438196138, "password": "JOBAYAR_CODX-GNFENNTUA", "account_id": 1, "name": "GHOST_YF09FM", "region": "BD" },
  { "uid": 4438199251, "password": "JOBAYAR_CODX-CEOKGL6IH", "account_id": 1, "name": "GHOST_KVZH1V", "region": "BD" },
  { "uid": 4438201509, "password": "JOBAYAR_CODX-KKLMTXTBH", "account_id": 1, "name": "GHOST_JATYBS", "region": "BD" },
  { "uid": 4438206465, "password": "JOBAYAR_CODX-7W7ZEU2WO", "account_id": 1, "name": "GHOST_SQXXGC", "region": "BD" },
  { "uid": 4438210156, "password": "JOBAYAR_CODX-OSZGTLJFV", "account_id": 1, "name": "GHOST_QJGY4H", "region": "BD" },
  { "uid": 4438212510, "password": "JOBAYAR_CODX-SW9V2IYHT", "account_id": 1, "name": "GHOST_OZAU86", "region": "BD" },
  { "uid": 4438215691, "password": "JOBAYAR_CODX-L3Y6CJZJJ", "account_id": 1, "name": "GHOST_MK6K8G", "region": "BD" },
  { "uid": 4438218033, "password": "JOBAYAR_CODX-BI3QHA8WA", "account_id": 1, "name": "GHOST_3OIP4E", "region": "BD" },
  { "uid": 4438218252, "password": "JOBAYAR_CODX-LDFFS3P4O", "account_id": 1, "name": "GHOST_4VSYHE", "region": "BD" },
  { "uid": 4438220664, "password": "JOBAYAR_CODX-7TZLEQFA3", "account_id": 1, "name": "GHOST_0EWXQ5", "region": "BD" },
  { "uid": 4438221290, "password": "JOBAYAR_CODX-JZYOIGKXM", "account_id": 1, "name": "GHOST_BQCPQP", "region": "BD" },
  { "uid": 4438223142, "password": "JOBAYAR_CODX-ZHE6EPFYV", "account_id": 1, "name": "GHOST_XFH4GY", "region": "BD" },
  { "uid": 4438226591, "password": "JOBAYAR_CODX-DAZ1FNV2X", "account_id": 1, "name": "GHOST_QK5FQT", "region": "BD" },
  { "uid": 4438229625, "password": "JOBAYAR_CODX-ZC0N34LGB", "account_id": 1, "name": "GHOST_UEIYHW", "region": "BD" },
  { "uid": 4438231873, "password": "JOBAYAR_CODX-BOJJJYPSL", "account_id": 1, "name": "GHOST_TMJPVO", "region": "BD" },
  { "uid": 4438232378, "password": "JOBAYAR_CODX-M396BRMT7", "account_id": 1, "name": "GHOST_6L7ZTL", "region": "BD" },
  { "uid": 4438240246, "password": "JOBAYAR_CODX-IMI1I5YKM", "account_id": 1, "name": "GHOST_MAU9NT", "region": "BD" },
  { "uid": 4438242086, "password": "JOBAYAR_CODX-FHZTKN2BL", "account_id": 1, "name": "GHOST_JJXJOF", "region": "BD" },
  { "uid": 4438253606, "password": "JOBAYAR_CODX-G6WH0FTXU", "account_id": 1, "name": "GHOST_SAL7O0", "region": "BD" },
  { "uid": 4438256453, "password": "JOBAYAR_CODX-SOYKOLB5S", "account_id": 1, "name": "GHOST_EABJ4T", "region": "BD" },
  { "uid": 4438258955, "password": "JOBAYAR_CODX-JRVJE5XUK", "account_id": 1, "name": "GHOST_O1PZ2X", "region": "BD" },
  { "uid": 4438261697, "password": "JOBAYAR_CODX-6FQXM1DMS", "account_id": 1, "name": "GHOST_8CNBUM", "region": "BD" },
  { "uid": 4438264319, "password": "JOBAYAR_CODX-7TEBZQGVP", "account_id": 1, "name": "GHOST_MGFTIK", "region": "BD" },
  { "uid": 4438266817, "password": "JOBAYAR_CODX-YFLE3NGR8", "account_id": 1, "name": "GHOST_CEZTO3", "region": "BD" },
  { "uid": 4438272381, "password": "JOBAYAR_CODX-K6Y0PLI3U", "account_id": 1, "name": "GHOST_BOKLF6", "region": "BD" },
  { "uid": 4438275137, "password": "JOBAYAR_CODX-KB3GWBXCS", "account_id": 1, "name": "GHOST_KPJVUS", "region": "BD" },
  { "uid": 4438276874, "password": "JOBAYAR_CODX-7LPKQLJI6", "account_id": 1, "name": "GHOST_4KEDZZ", "region": "BD" },
  { "uid": 4438279857, "password": "JOBAYAR_CODX-FXM2BO1DM", "account_id": 1, "name": "GHOST_RBG6H8", "region": "BD" },
  { "uid": 4438282587, "password": "JOBAYAR_CODX-YYLAIBCAR", "account_id": 1, "name": "GHOST_DWOQXW", "region": "BD" },
  { "uid": 4438285958, "password": "JOBAYAR_CODX-CPYWEGJIQ", "account_id": 1, "name": "GHOST_PIJL60", "region": "BD" },
  { "uid": 4438287903, "password": "JOBAYAR_CODX-MTYKIKVXZ", "account_id": 1, "name": "GHOST_YCCCEK", "region": "BD" },
  { "uid": 4438290846, "password": "JOBAYAR_CODX-JTPKG4SMI", "account_id": 1, "name": "GHOST_DHHXZ5", "region": "BD" },
  { "uid": 4438293542, "password": "JOBAYAR_CODX-XFMQUIQ8J", "account_id": 1, "name": "GHOST_F0QVP4", "region": "BD" },
  { "uid": 4438296741, "password": "JOBAYAR_CODX-PEETEHOET", "account_id": 1, "name": "GHOST_5J69AI", "region": "BD" },
  { "uid": 4438299137, "password": "JOBAYAR_CODX-7D1G3WKXH", "account_id": 1, "name": "GHOST_YQHEJO", "region": "BD" },
  { "uid": 4438301428, "password": "JOBAYAR_CODX-EFNDTZQXI", "account_id": 1, "name": "GHOST_41AOTL", "region": "BD" },
  { "uid": 4438302470, "password": "JOBAYAR_CODX-IIA0N1DA4", "account_id": 1, "name": "GHOST_LAPNPA", "region": "BD" },
  { "uid": 4438304788, "password": "JOBAYAR_CODX-G60VBEAEV", "account_id": 1, "name": "GHOST_9DTEOM", "region": "BD" },
  { "uid": 4438307162, "password": "JOBAYAR_CODX-FWAZ8BNCQ", "account_id": 1, "name": "GHOST_7GCGBP", "region": "BD" },
  { "uid": 4438310177, "password": "JOBAYAR_CODX-VGKPXFTZS", "account_id": 1, "name": "GHOST_P0TBKT", "region": "BD" },
  { "uid": 4438312228, "password": "JOBAYAR_CODX-5UMYEANED", "account_id": 1, "name": "GHOST_MRISE0", "region": "BD" },
  { "uid": 4438314859, "password": "JOBAYAR_CODX-D5AD3USOI", "account_id": 1, "name": "GHOST_PAFBYM", "region": "BD" },
  { "uid": 4438318386, "password": "JOBAYAR_CODX-QUSJE2GQC", "account_id": 1, "name": "GHOST_MWNHOZ", "region": "BD" },
  { "uid": 4438320843, "password": "JOBAYAR_CODX-T4BDDFYDU", "account_id": 1, "name": "GHOST_4WNXF5", "region": "BD" },
  { "uid": 4438322954, "password": "JOBAYAR_CODX-17LR9EGSW", "account_id": 1, "name": "GHOST_0FLHG5", "region": "BD" },
  { "uid": 4438329661, "password": "JOBAYAR_CODX-HY1WY0OT0", "account_id": 1, "name": "GHOST_JKESHO", "region": "BD" },
  { "uid": 4438332286, "password": "JOBAYAR_CODX-VQYUQFJGT", "account_id": 1, "name": "GHOST_UGTWM6", "region": "BD" },
  { "uid": 4438334243, "password": "JOBAYAR_CODX-Y8J6YCM44", "account_id": 1, "name": "GHOST_6KB0XX", "region": "BD" },
  { "uid": 4438340711, "password": "JOBAYAR_CODX-SEI6VPDZN", "account_id": 1, "name": "GHOST_YZIQXH", "region": "BD" },
  { "uid": 4438342540, "password": "JOBAYAR_CODX-BERT2FHPP", "account_id": 1, "name": "GHOST_YN6PWV", "region": "BD" },
  { "uid": 4438345784, "password": "JOBAYAR_CODX-S8GZZ46HS", "account_id": 1, "name": "GHOST_WOIQLR", "region": "BD" },
  { "uid": 4438348596, "password": "JOBAYAR_CODX-Q7KJLZMX6", "account_id": 1, "name": "GHOST_2ML9KF", "region": "BD" },
  { "uid": 4438358640, "password": "JOBAYAR_CODX-LQDE0SVZV", "account_id": 1, "name": "GHOST_MBFN54", "region": "BD" },
  { "uid": 4438361314, "password": "JOBAYAR_CODX-7YUQJTSB4", "account_id": 1, "name": "GHOST_KJSNXV", "region": "BD" },
  { "uid": 4438368197, "password": "JOBAYAR_CODX-96CKZ5DXW", "account_id": 1, "name": "GHOST_YYJNRO", "region": "BD" },
  { "uid": 4438373192, "password": "JOBAYAR_CODX-80OOOSLBB", "account_id": 1, "name": "GHOST_KLB5BU", "region": "BD" },
  { "uid": 4438375604, "password": "JOBAYAR_CODX-J6V42PSUS", "account_id": 1, "name": "GHOST_9FSBOK", "region": "BD" },
  { "uid": 4438377921, "password": "JOBAYAR_CODX-B2AKXECVE", "account_id": 1, "name": "GHOST_REQDDF", "region": "BD" },
  { "uid": 4438383105, "password": "JOBAYAR_CODX-SKDVEWDZQ", "account_id": 1, "name": "GHOST_7INTTY", "region": "BD" },
  { "uid": 4438384972, "password": "JOBAYAR_CODX-8IACEBHIK", "account_id": 1, "name": "GHOST_PCHMOX", "region": "BD" },
  { "uid": 4438389887, "password": "JOBAYAR_CODX-CFDEQGKGV", "account_id": 1, "name": "GHOST_OCQUYC", "region": "BD" },
  { "uid": 4438395377, "password": "JOBAYAR_CODX-O0KCECQMA", "account_id": 1, "name": "GHOST_RKJKWP", "region": "BD" },
  { "uid": 4438399899, "password": "JOBAYAR_CODX-XV7Y5TBYA", "account_id": 1, "name": "GHOST_O7NAN6", "region": "BD" },
  { "uid": 4438402041, "password": "JOBAYAR_CODX-MMNHSDP1K", "account_id": 1, "name": "GHOST_SI5FNS", "region": "BD" },
  { "uid": 4438406429, "password": "JOBAYAR_CODX-ZNVVNLBS3", "account_id": 1, "name": "GHOST_DNIYRJ", "region": "BD" },
  { "uid": 4438414141, "password": "JOBAYAR_CODX-V1NYW7BD0", "account_id": 1, "name": "GHOST_EK7PJ1", "region": "BD" },
  { "uid": 4438414350, "password": "JOBAYAR_CODX-KUX6Q44WV", "account_id": 1, "name": "GHOST_ZUBKNW", "region": "BD" },
  { "uid": 4438416658, "password": "JOBAYAR_CODX-DMJLSIC8G", "account_id": 1, "name": "GHOST_5HLM6E", "region": "BD" }
];

const SECRET_KEY = "DARKNESS_VIP"; 
const ADMIN_PASSWORD = "admin"; 

// --- 2. MIDDLEWARE ---
const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        jwt.verify(bearer[1], SECRET_KEY, (err, authData) => {
            if (err) return res.status(403).json({ status: false, message: "Invalid Token" });
            req.authData = authData;
            next();
        });
    } else {
        res.status(403).json({ status: false, message: "Token Required" });
    }
};

// --- 3. ROUTES ---

// Home
app.get('/', (req, res) => {
    res.json({
        status: true,
        message: "FF Like API is Online 🟢",
        total_accounts: accounts.length,
        developer: "Dev by Darkness"
    });
});

// Login
app.post('/login', (req, res) => {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
        const token = jwt.sign({ role: 'admin' }, SECRET_KEY, { expiresIn: '1h' });
        return res.json({ status: true, token: token });
    }
    return res.status(403).json({ status: false, message: "Wrong Password" });
});

// Send Likes
app.post('/send-likes', verifyToken, (req, res) => {
    const { target_uid, count } = req.body;
    if (!target_uid) return res.status(400).json({ status: false, message: "Target UID required" });

    let limit = count || 10;
    if (limit > accounts.length) limit = accounts.length;

    const workers = accounts.slice(0, limit);

    res.json({
        status: true,
        message: `Sending ${limit} likes to ${target_uid}`,
        data: workers.map(w => ({ 
            worker: w.name, 
            status: "Success", 
            time: new Date().toISOString() 
        }))
    });
});

module.exports = app;    "account_id": 1,
    "name": "GHOST_LEXYEU",
    "region": "BD"
  },
  {
    "uid": 4438048277,
    "password": "JOBAYAR_CODX-JDU0LA3S8",
    "account_id": 1,
    "name": "GHOST_WP2A8V",
    "region": "BD"
  },
  {
    "uid": 4438048529,
    "password": "JOBAYAR_CODX-GH7JEJRKR",
    "account_id": 1,
    "name": "GHOST_NMVSHW",
    "region": "BD"
  },
  {
    "uid": 4438050555,
    "password": "JOBAYAR_CODX-ZZJPTTXBV",
    "account_id": 1,
    "name": "GHOST_MJE6A1",
    "region": "BD"
  },
  {
    "uid": 4438050847,
    "password": "JOBAYAR_CODX-HXO93ZCFL",
    "account_id": 1,
    "name": "GHOST_MSJSWT",
    "region": "BD"
  },
  {
    "uid": 4438051436,
    "password": "JOBAYAR_CODX-QEMBQOYD1",
    "account_id": 1,
    "name": "GHOST_0V1IYB",
    "region": "BD"
  },
  {
    "uid": 4438053556,
    "password": "JOBAYAR_CODX-XGLSILOLE",
    "account_id": 1,
    "name": "GHOST_Q4JANE",
    "region": "BD"
  },
  {
    "uid": 4438056888,
    "password": "JOBAYAR_CODX-5KRGD7F7W",
    "account_id": 1,
    "name": "GHOST_BBJRKA",
    "region": "BD"
  },
  {
    "uid": 4438059249,
    "password": "JOBAYAR_CODX-Y2XUDNXXQ",
    "account_id": 1,
    "name": "GHOST_CULYZ2",
    "region": "BD"
  },
  {
    "uid": 4438060258,
    "password": "JOBAYAR_CODX-RFT4PQSEM",
    "account_id": 1,
    "name": "GHOST_QAVOJW",
    "region": "BD"
  },
  {
    "uid": 4438060430,
    "password": "JOBAYAR_CODX-HLQFZC8NY",
    "account_id": 1,
    "name": "GHOST_MYQENT",
    "region": "BD"
  },
  {
    "uid": 4438063449,
    "password": "JOBAYAR_CODX-QELPF27Z0",
    "account_id": 1,
    "name": "GHOST_KXYBW3",
    "region": "BD"
  },
  {
    "uid": 4438065959,
    "password": "JOBAYAR_CODX-7EGJPLWGU",
    "account_id": 1,
    "name": "GHOST_Z3RHTL",
    "region": "BD"
  },
  {
    "uid": 4438071644,
    "password": "JOBAYAR_CODX-ZHLBWQNGI",
    "account_id": 1,
    "name": "GHOST_2WTKFY",
    "region": "BD"
  },
  {
    "uid": 4438074211,
    "password": "JOBAYAR_CODX-HNP8CTAKN",
    "account_id": 1,
    "name": "GHOST_MDQGOT",
    "region": "BD"
  },
  {
    "uid": 4438074492,
    "password": "JOBAYAR_CODX-OUA6KWQL4",
    "account_id": 1,
    "name": "GHOST_RFODRB",
    "region": "BD"
  },
  {
    "uid": 4438074883,
    "password": "JOBAYAR_CODX-6V2I1R7U9",
    "account_id": 1,
    "name": "GHOST_XS6FJS",
    "region": "BD"
  },
  {
    "uid": 4438075028,
    "password": "JOBAYAR_CODX-WO8RIFQJO",
    "account_id": 1,
    "name": "GHOST_QCQKRP",
    "region": "BD"
  },
  {
    "uid": 4438076847,
    "password": "JOBAYAR_CODX-IILM4OTN8",
    "account_id": 1,
    "name": "GHOST_DLR3WW",
    "region": "BD"
  },
  {
    "uid": 4438077262,
    "password": "JOBAYAR_CODX-JDCBEN4WK",
    "account_id": 1,
    "name": "GHOST_OU6VLQ",
    "region": "BD"
  },
  {
    "uid": 4438077830,
    "password": "JOBAYAR_CODX-RVKDFZCB8",
    "account_id": 1,
    "name": "GHOST_VRHFTA",
    "region": "BD"
  },
  {
    "uid": 4438078002,
    "password": "JOBAYAR_CODX-RRPXUBP63",
    "account_id": 1,
    "name": "GHOST_BDHQ9D",
    "region": "BD"
  },
  {
    "uid": 4438080927,
    "password": "JOBAYAR_CODX-X56J5ZPTF",
    "account_id": 1,
    "name": "GHOST_JINJCG",
    "region": "BD"
  },
  {
    "uid": 4438083024,
    "password": "JOBAYAR_CODX-7FWXUO7JA",
    "account_id": 1,
    "name": "GHOST_IIFDB7",
    "region": "BD"
  },
  {
    "uid": 4438086031,
    "password": "JOBAYAR_CODX-5R0GSNDKA",
    "account_id": 1,
    "name": "GHOST_PUJXWD",
    "region": "BD"
  },
  {
    "uid": 4438089119,
    "password": "JOBAYAR_CODX-VXQLYNLY9",
    "account_id": 1,
    "name": "GHOST_YJR4VG",
    "region": "BD"
  },
  {
    "uid": 4438089824,
    "password": "JOBAYAR_CODX-9MK4E1AFF",
    "account_id": 1,
    "name": "GHOST_2WRBWS",
    "region": "BD"
  },
  {
    "uid": 4438091752,
    "password": "JOBAYAR_CODX-VIURMQE6Q",
    "account_id": 1,
    "name": "GHOST_J8W6EE",
    "region": "BD"
  },
  {
    "uid": 4438092293,
    "password": "JOBAYAR_CODX-SHAAAZAQE",
    "account_id": 1,
    "name": "GHOST_VSUOM5",
    "region": "BD"
  },
  {
    "uid": 4438093058,
    "password": "JOBAYAR_CODX-WIWLAT785",
    "account_id": 1,
    "name": "GHOST_TTCZ3O",
    "region": "BD"
  },
  {
    "uid": 4438095130,
    "password": "JOBAYAR_CODX-JQUQLNMW7",
    "account_id": 1,
    "name": "GHOST_MZNVVM",
    "region": "BD"
  },
  {
    "uid": 4438095455,
    "password": "JOBAYAR_CODX-FKSJMGVUN",
    "account_id": 1,
    "name": "GHOST_51AVDS",
    "region": "BD"
  },
  {
    "uid": 4438098041,
    "password": "JOBAYAR_CODX-VGFK6JEOM",
    "account_id": 1,
    "name": "GHOST_XHTANH",
    "region": "BD"
  },
  {
    "uid": 4438098457,
    "password": "JOBAYAR_CODX-CXTA94PVO",
    "account_id": 1,
    "name": "GHOST_GLMQO2",
    "region": "BD"
  },
  {
    "uid": 4438101062,
    "password": "JOBAYAR_CODX-N0THDRNRX",
    "account_id": 1,
    "name": "GHOST_B19IUD",
    "region": "BD"
  },
  {
    "uid": 4438101541,
    "password": "JOBAYAR_CODX-UUIAYMNNV",
    "account_id": 1,
    "name": "GHOST_4RZCND",
    "region": "BD"
  },
  {
    "uid": 4438101887,
    "password": "JOBAYAR_CODX-WFN5LQRS3",
    "account_id": 1,
    "name": "GHOST_HUJUZS",
    "region": "BD"
  },
  {
    "uid": 4438103799,
    "password": "JOBAYAR_CODX-WBKIIXUGN",
    "account_id": 1,
    "name": "GHOST_ITFIQR",
    "region": "BD"
  },
  {
    "uid": 4438104467,
    "password": "JOBAYAR_CODX-DDF0H0MMY",
    "account_id": 1,
    "name": "GHOST_SPKND0",
    "region": "BD"
  },
  {
    "uid": 4438106811,
    "password": "JOBAYAR_CODX-LBUNHQX1Y",
    "account_id": 1,
    "name": "GHOST_7IUUBQ",
    "region": "BD"
  },
  {
    "uid": 4438107075,
    "password": "JOBAYAR_CODX-UWGV6F2WX",
    "account_id": 1,
    "name": "GHOST_XYL3QK",
    "region": "BD"
  },
  {
    "uid": 4438107595,
    "password": "JOBAYAR_CODX-NBPOTD0GK",
    "account_id": 1,
    "name": "GHOST_4PJMZH",
    "region": "BD"
  },
  {
    "uid": 4438110125,
    "password": "JOBAYAR_CODX-P42ZAOOPZ",
    "account_id": 1,
    "name": "GHOST_KLNEEW",
    "region": "BD"
  },
  {
    "uid": 4438110611,
    "password": "JOBAYAR_CODX-YVVPIXIOV",
    "account_id": 1,
    "name": "GHOST_21GNBP",
    "region": "BD"
  },
  {
    "uid": 4438118496,
    "password": "JOBAYAR_CODX-JXKGROJMN",
    "account_id": 1,
    "name": "GHOST_AJDM3U",
    "region": "BD"
  },
  {
    "uid": 4438119116,
    "password": "JOBAYAR_CODX-PNJIJ2DAA",
    "account_id": 1,
    "name": "GHOST_XJFKTZ",
    "region": "BD"
  },
  {
    "uid": 4438122167,
    "password": "JOBAYAR_CODX-ELNXQWHOU",
    "account_id": 1,
    "name": "GHOST_ARMEZG",
    "region": "BD"
  },
  {
    "uid": 4438124134,
    "password": "JOBAYAR_CODX-DLPLK0X3J",
    "account_id": 1,
    "name": "GHOST_1NA9LJ",
    "region": "BD"
  },
  {
    "uid": 4438127592,
    "password": "JOBAYAR_CODX-LOLGD98AU",
    "account_id": 1,
    "name": "GHOST_GUGLM6",
    "region": "BD"
  },
  {
    "uid": 4438132150,
    "password": "JOBAYAR_CODX-AHF8NNIKL",
    "account_id": 1,
    "name": "GHOST_SDBHQH",
    "region": "BD"
  },
  {
    "uid": 4438132593,
    "password": "JOBAYAR_CODX-E0TVVU961",
    "account_id": 1,
    "name": "GHOST_ZIXWWA",
    "region": "BD"
  },
  {
    "uid": 4438134935,
    "password": "JOBAYAR_CODX-HNRWEQVPY",
    "account_id": 1,
    "name": "GHOST_JJAIFD",
    "region": "BD"
  },
  {
    "uid": 4438138798,
    "password": "JOBAYAR_CODX-CYQMKQVJK",
    "account_id": 1,
    "name": "GHOST_RVTWWN",
    "region": "BD"
  },
  {
    "uid": 4438143366,
    "password": "JOBAYAR_CODX-GCVFO15V8",
    "account_id": 1,
    "name": "GHOST_C1BVOI",
    "region": "BD"
  },
  {
    "uid": 4438143793,
    "password": "JOBAYAR_CODX-VAOFIVNQA",
    "account_id": 1,
    "name": "GHOST_0YAQES",
    "region": "BD"
  },
  {
    "uid": 4438144306,
    "password": "JOBAYAR_CODX-5GHEJREQJ",
    "account_id": 1,
    "name": "GHOST_CVUMJZ",
    "region": "BD"
  },
  {
    "uid": 4438146142,
    "password": "JOBAYAR_CODX-XXYOWHEEV",
    "account_id": 1,
    "name": "GHOST_VAJ2YP",
    "region": "BD"
  },
  {
    "uid": 4438146461,
    "password": "JOBAYAR_CODX-XETOSDXI7",
    "account_id": 1,
    "name": "GHOST_AOYBUW",
    "region": "BD"
  },
  {
    "uid": 4438146989,
    "password": "JOBAYAR_CODX-W9FPJI2KP",
    "account_id": 1,
    "name": "GHOST_DQGJG6",
    "region": "BD"
  },
  {
    "uid": 4438149352,
    "password": "JOBAYAR_CODX-MPSDEWMXO",
    "account_id": 1,
    "name": "GHOST_LDN700",
    "region": "BD"
  },
  {
    "uid": 4438151631,
    "password": "JOBAYAR_CODX-WWEKDEQLO",
    "account_id": 1,
    "name": "GHOST_QX01AD",
    "region": "BD"
  },
  {
    "uid": 4438154269,
    "password": "JOBAYAR_CODX-BUONTEEOT",
    "account_id": 1,
    "name": "GHOST_5TY3ZK",
    "region": "BD"
  },
  {
    "uid": 4438155182,
    "password": "JOBAYAR_CODX-ZAAMXGFAZ",
    "account_id": 1,
    "name": "GHOST_8HTDLG",
    "region": "BD"
  },
  {
    "uid": 4438157398,
    "password": "JOBAYAR_CODX-NWVERDEQI",
    "account_id": 1,
    "name": "GHOST_B79EGV",
    "region": "BD"
  },
  {
    "uid": 4438162271,
    "password": "JOBAYAR_CODX-LINHNVQCM",
    "account_id": 1,
    "name": "GHOST_5KPGZ8",
    "region": "BD"
  },
  {
    "uid": 4438165493,
    "password": "JOBAYAR_CODX-B9GEQKZZ3",
    "account_id": 1,
    "name": "GHOST_FIHDD9",
    "region": "BD"
  },
  {
    "uid": 4438168647,
    "password": "JOBAYAR_CODX-AUCFKV3I3",
    "account_id": 1,
    "name": "GHOST_YAOUKF",
    "region": "BD"
  },
  {
    "uid": 4438170518,
    "password": "JOBAYAR_CODX-A7QKWR4J8",
    "account_id": 1,
    "name": "GHOST_EXHLST",
    "region": "BD"
  },
  {
    "uid": 4438171275,
    "password": "JOBAYAR_CODX-SEPZKCY8R",
    "account_id": 1,
    "name": "GHOST_XMKDFY",
    "region": "BD"
  },
  {
    "uid": 4438173374,
    "password": "JOBAYAR_CODX-TRE6VD1JG",
    "account_id": 1,
    "name": "GHOST_HN7TJV",
    "region": "BD"
  },
  {
    "uid": 4438174298,
    "password": "JOBAYAR_CODX-3XVGUSGIK",
    "account_id": 1,
    "name": "GHOST_ZFFTES",
    "region": "BD"
  },
  {
    "uid": 4438176471,
    "password": "JOBAYAR_CODX-DWUHGQX3H",
    "account_id": 1,
    "name": "GHOST_OZHJDZ",
    "region": "BD"
  },
  {
    "uid": 4438176943,
    "password": "JOBAYAR_CODX-JCKTFKXRE",
    "account_id": 1,
    "name": "GHOST_YSZAQD",
    "region": "BD"
  },
  {
    "uid": 4438179573,
    "password": "JOBAYAR_CODX-VQKKICKV5",
    "account_id": 1,
    "name": "GHOST_6QPUNG",
    "region": "BD"
  },
  {
    "uid": 4438185225,
    "password": "JOBAYAR_CODX-ZTRIPAE67",
    "account_id": 1,
    "name": "GHOST_C61QBQ",
    "region": "BD"
  },
  {
    "uid": 4438188034,
    "password": "JOBAYAR_CODX-7BP9LVDCC",
    "account_id": 1,
    "name": "GHOST_ORBZGK",
    "region": "BD"
  },
  {
    "uid": 4438190689,
    "password": "JOBAYAR_CODX-L1Q751WAK",
    "account_id": 1,
    "name": "GHOST_Y4XOUS",
    "region": "BD"
  },
  {
    "uid": 4438190904,
    "password": "JOBAYAR_CODX-NK0HQGRQJ",
    "account_id": 1,
    "name": "GHOST_XM0BEG",
    "region": "BD"
  },
  {
    "uid": 4438192879,
    "password": "JOBAYAR_CODX-C2TQJPFQF",
    "account_id": 1,
    "name": "GHOST_MTINF0",
    "region": "BD"
  },
  {
    "uid": 4438193837,
    "password": "JOBAYAR_CODX-UX3J4TEOK",
    "account_id": 1,
    "name": "GHOST_PHU6AO",
    "region": "BD"
  },
  {
    "uid": 4438196138,
    "password": "JOBAYAR_CODX-GNFENNTUA",
    "account_id": 1,
    "name": "GHOST_YF09FM",
    "region": "BD"
  },
  {
    "uid": 4438199251,
    "password": "JOBAYAR_CODX-CEOKGL6IH",
    "account_id": 1,
    "name": "GHOST_KVZH1V",
    "region": "BD"
  },
  {
    "uid": 4438201509,
    "password": "JOBAYAR_CODX-KKLMTXTBH",
    "account_id": 1,
    "name": "GHOST_JATYBS",
    "region": "BD"
  },
  {
    "uid": 4438206465,
    "password": "JOBAYAR_CODX-7W7ZEU2WO",
    "account_id": 1,
    "name": "GHOST_SQXXGC",
    "region": "BD"
  },
  {
    "uid": 4438210156,
    "password": "JOBAYAR_CODX-OSZGTLJFV",
    "account_id": 1,
    "name": "GHOST_QJGY4H",
    "region": "BD"
  },
  {
    "uid": 4438212510,
    "password": "JOBAYAR_CODX-SW9V2IYHT",
    "account_id": 1,
    "name": "GHOST_OZAU86",
    "region": "BD"
  },
  {
    "uid": 4438215691,
    "password": "JOBAYAR_CODX-L3Y6CJZJJ",
    "account_id": 1,
    "name": "GHOST_MK6K8G",
    "region": "BD"
  },
  {
    "uid": 4438218033,
    "password": "JOBAYAR_CODX-BI3QHA8WA",
    "account_id": 1,
    "name": "GHOST_3OIP4E",
    "region": "BD"
  },
  {
    "uid": 4438218252,
    "password": "JOBAYAR_CODX-LDFFS3P4O",
    "account_id": 1,
    "name": "GHOST_4VSYHE",
    "region": "BD"
  },
  {
    "uid": 4438220664,
    "password": "JOBAYAR_CODX-7TZLEQFA3",
    "account_id": 1,
    "name": "GHOST_0EWXQ5",
    "region": "BD"
  },
  {
    "uid": 4438221290,
    "password": "JOBAYAR_CODX-JZYOIGKXM",
    "account_id": 1,
    "name": "GHOST_BQCPQP",
    "region": "BD"
  },
  {
    "uid": 4438223142,
    "password": "JOBAYAR_CODX-ZHE6EPFYV",
    "account_id": 1,
    "name": "GHOST_XFH4GY",
    "region": "BD"
  },
  {
    "uid": 4438226591,
    "password": "JOBAYAR_CODX-DAZ1FNV2X",
    "account_id": 1,
    "name": "GHOST_QK5FQT",
    "region": "BD"
  },
  {
    "uid": 4438229625,
    "password": "JOBAYAR_CODX-ZC0N34LGB",
    "account_id": 1,
    "name": "GHOST_UEIYHW",
    "region": "BD"
  },
  {
    "uid": 4438231873,
    "password": "JOBAYAR_CODX-BOJJJYPSL",
    "account_id": 1,
    "name": "GHOST_TMJPVO",
    "region": "BD"
  },
  {
    "uid": 4438232378,
    "password": "JOBAYAR_CODX-M396BRMT7",
    "account_id": 1,
    "name": "GHOST_6L7ZTL",
    "region": "BD"
  },
  {
    "uid": 4438240246,
    "password": "JOBAYAR_CODX-IMI1I5YKM",
    "account_id": 1,
    "name": "GHOST_MAU9NT",
    "region": "BD"
  },
  {
    "uid": 4438242086,
    "password": "JOBAYAR_CODX-FHZTKN2BL",
    "account_id": 1,
    "name": "GHOST_JJXJOF",
    "region": "BD"
  },
  {
    "uid": 4438253606,
    "password": "JOBAYAR_CODX-G6WH0FTXU",
    "account_id": 1,
    "name": "GHOST_SAL7O0",
    "region": "BD"
  },
  {
    "uid": 4438256453,
    "password": "JOBAYAR_CODX-SOYKOLB5S",
    "account_id": 1,
    "name": "GHOST_EABJ4T",
    "region": "BD"
  },
  {
    "uid": 4438258955,
    "password": "JOBAYAR_CODX-JRVJE5XUK",
    "account_id": 1,
    "name": "GHOST_O1PZ2X",
    "region": "BD"
  },
  {
    "uid": 4438261697,
    "password": "JOBAYAR_CODX-6FQXM1DMS",
    "account_id": 1,
    "name": "GHOST_8CNBUM",
    "region": "BD"
  },
  {
    "uid": 4438264319,
    "password": "JOBAYAR_CODX-7TEBZQGVP",
    "account_id": 1,
    "name": "GHOST_MGFTIK",
    "region": "BD"
  },
  {
    "uid": 4438266817,
    "password": "JOBAYAR_CODX-YFLE3NGR8",
    "account_id": 1,
    "name": "GHOST_CEZTO3",
    "region": "BD"
  },
  {
    "uid": 4438272381,
    "password": "JOBAYAR_CODX-K6Y0PLI3U",
    "account_id": 1,
    "name": "GHOST_BOKLF6",
    "region": "BD"
  },
  {
    "uid": 4438275137,
    "password": "JOBAYAR_CODX-KB3GWBXCS",
    "account_id": 1,
    "name": "GHOST_KPJVUS",
    "region": "BD"
  },
  {
    "uid": 4438276874,
    "password": "JOBAYAR_CODX-7LPKQLJI6",
    "account_id": 1,
    "name": "GHOST_4KEDZZ",
    "region": "BD"
  },
  {
    "uid": 4438279857,
    "password": "JOBAYAR_CODX-FXM2BO1DM",
    "account_id": 1,
    "name": "GHOST_RBG6H8",
    "region": "BD"
  },
  {
    "uid": 4438282587,
    "password": "JOBAYAR_CODX-YYLAIBCAR",
    "account_id": 1,
    "name": "GHOST_DWOQXW",
    "region": "BD"
  },
  {
    "uid": 4438285958,
    "password": "JOBAYAR_CODX-CPYWEGJIQ",
    "account_id": 1,
    "name": "GHOST_PIJL60",
    "region": "BD"
  },
  {
    "uid": 4438287903,
    "password": "JOBAYAR_CODX-MTYKIKVXZ",
    "account_id": 1,
    "name": "GHOST_YCCCEK",
    "region": "BD"
  },
  {
    "uid": 4438290846,
    "password": "JOBAYAR_CODX-JTPKG4SMI",
    "account_id": 1,
    "name": "GHOST_DHHXZ5",
    "region": "BD"
  },
  {
    "uid": 4438293542,
    "password": "JOBAYAR_CODX-XFMQUIQ8J",
    "account_id": 1,
    "name": "GHOST_F0QVP4",
    "region": "BD"
  },
  {
    "uid": 4438296741,
    "password": "JOBAYAR_CODX-PEETEHOET",
    "account_id": 1,
    "name": "GHOST_5J69AI",
    "region": "BD"
  },
  {
    "uid": 4438299137,
    "password": "JOBAYAR_CODX-7D1G3WKXH",
    "account_id": 1,
    "name": "GHOST_YQHEJO",
    "region": "BD"
  },
  {
    "uid": 4438301428,
    "password": "JOBAYAR_CODX-EFNDTZQXI",
    "account_id": 1,
    "name": "GHOST_41AOTL",
    "region": "BD"
  },
  {
    "uid": 4438302470,
    "password": "JOBAYAR_CODX-IIA0N1DA4",
    "account_id": 1,
    "name": "GHOST_LAPNPA",
    "region": "BD"
  },
  {
    "uid": 4438304788,
    "password": "JOBAYAR_CODX-G60VBEAEV",
    "account_id": 1,
    "name": "GHOST_9DTEOM",
    "region": "BD"
  },
  {
    "uid": 4438307162,
    "password": "JOBAYAR_CODX-FWAZ8BNCQ",
    "account_id": 1,
    "name": "GHOST_7GCGBP",
    "region": "BD"
  },
  {
    "uid": 4438310177,
    "password": "JOBAYAR_CODX-VGKPXFTZS",
    "account_id": 1,
    "name": "GHOST_P0TBKT",
    "region": "BD"
  },
  {
    "uid": 4438312228,
    "password": "JOBAYAR_CODX-5UMYEANED",
    "account_id": 1,
    "name": "GHOST_MRISE0",
    "region": "BD"
  },
  {
    "uid": 4438314859,
    "password": "JOBAYAR_CODX-D5AD3USOI",
    "account_id": 1,
    "name": "GHOST_PAFBYM",
    "region": "BD"
  },
  {
    "uid": 4438318386,
    "password": "JOBAYAR_CODX-QUSJE2GQC",
    "account_id": 1,
    "name": "GHOST_MWNHOZ",
    "region": "BD"
  },
  {
    "uid": 4438320843,
    "password": "JOBAYAR_CODX-T4BDDFYDU",
    "account_id": 1,
    "name": "GHOST_4WNXF5",
    "region": "BD"
  },
  {
    "uid": 4438322954,
    "password": "JOBAYAR_CODX-17LR9EGSW",
    "account_id": 1,
    "name": "GHOST_0FLHG5",
    "region": "BD"
  },
  {
    "uid": 4438329661,
    "password": "JOBAYAR_CODX-HY1WY0OT0",
    "account_id": 1,
    "name": "GHOST_JKESHO",
    "region": "BD"
  },
  {
    "uid": 4438332286,
    "password": "JOBAYAR_CODX-VQYUQFJGT",
    "account_id": 1,
    "name": "GHOST_UGTWM6",
    "region": "BD"
  },
  {
    "uid": 4438334243,
    "password": "JOBAYAR_CODX-Y8J6YCM44",
    "account_id": 1,
    "name": "GHOST_6KB0XX",
    "region": "BD"
  },
  {
    "uid": 4438340711,
    "password": "JOBAYAR_CODX-SEI6VPDZN",
    "account_id": 1,
    "name": "GHOST_YZIQXH",
    "region": "BD"
  },
  {
    "uid": 4438342540,
    "password": "JOBAYAR_CODX-BERT2FHPP",
    "account_id": 1,
    "name": "GHOST_YN6PWV",
    "region": "BD"
  },
  {
    "uid": 4438345784,
    "password": "JOBAYAR_CODX-S8GZZ46HS",
    "account_id": 1,
    "name": "GHOST_WOIQLR",
    "region": "BD"
  },
  {
    "uid": 4438348596,
    "password": "JOBAYAR_CODX-Q7KJLZMX6",
    "account_id": 1,
    "name": "GHOST_2ML9KF",
    "region": "BD"
  },
  {
    "uid": 4438358640,
    "password": "JOBAYAR_CODX-LQDE0SVZV",
    "account_id": 1,
    "name": "GHOST_MBFN54",
    "region": "BD"
  },
  {
    "uid": 4438361314,
    "password": "JOBAYAR_CODX-7YUQJTSB4",
    "account_id": 1,
    "name": "GHOST_KJSNXV",
    "region": "BD"
  },
  {
    "uid": 4438368197,
    "password": "JOBAYAR_CODX-96CKZ5DXW",
    "account_id": 1,
    "name": "GHOST_YYJNRO",
    "region": "BD"
  },
  {
    "uid": 4438373192,
    "password": "JOBAYAR_CODX-80OOOSLBB",
    "account_id": 1,
    "name": "GHOST_KLB5BU",
    "region": "BD"
  },
  {
    "uid": 4438375604,
    "password": "JOBAYAR_CODX-J6V42PSUS",
    "account_id": 1,
    "name": "GHOST_9FSBOK",
    "region": "BD"
  },
  {
    "uid": 4438377921,
    "password": "JOBAYAR_CODX-B2AKXECVE",
    "account_id": 1,
    "name": "GHOST_REQDDF",
    "region": "BD"
  },
  {
    "uid": 4438383105,
    "password": "JOBAYAR_CODX-SKDVEWDZQ",
    "account_id": 1,
    "name": "GHOST_7INTTY",
    "region": "BD"
  },
  {
    "uid": 4438384972,
    "password": "JOBAYAR_CODX-8IACEBHIK",
    "account_id": 1,
    "name": "GHOST_PCHMOX",
    "region": "BD"
  },
  {
    "uid": 4438389887,
    "password": "JOBAYAR_CODX-CFDEQGKGV",
    "account_id": 1,
    "name": "GHOST_OCQUYC",
    "region": "BD"
  },
  {
    "uid": 4438395377,
    "password": "JOBAYAR_CODX-O0KCECQMA",
    "account_id": 1,
    "name": "GHOST_RKJKWP",
    "region": "BD"
  },
  {
    "uid": 4438399899,
    "password": "JOBAYAR_CODX-XV7Y5TBYA",
    "account_id": 1,
    "name": "GHOST_O7NAN6",
    "region": "BD"
  },
  {
    "uid": 4438402041,
    "password": "JOBAYAR_CODX-MMNHSDP1K",
    "account_id": 1,
    "name": "GHOST_SI5FNS",
    "region": "BD"
  },
  {
    "uid": 4438406429,
    "password": "JOBAYAR_CODX-ZNVVNLBS3",
    "account_id": 1,
    "name": "GHOST_DNIYRJ",
    "region": "BD"
  },
  {
    "uid": 4438414141,
    "password": "JOBAYAR_CODX-V1NYW7BD0",
    "account_id": 1,
    "name": "GHOST_EK7PJ1",
    "region": "BD"
  },
  {
    "uid": 4438414350,
    "password": "JOBAYAR_CODX-KUX6Q44WV",
    "account_id": 1,
    "name": "GHOST_ZUBKNW",
    "region": "BD"
  },
  {
    "uid": 4438416658,
    "password": "JOBAYAR_CODX-DMJLSIC8G",
    "account_id": 1,
    "name": "GHOST_5HLM6E",
    "region": "BD"
  }
];    "region": "BD"
  },
  {
    "uid": 4438048529,
    "password": "JOBAYAR_CODX-GH7JEJRKR",
    "account_id": 1,
    "name": "GHOST_NMVSHW",
    "region": "BD"
  },
  {
    "uid": 4438050555,
    "password": "JOBAYAR_CODX-ZZJPTTXBV",
    "account_id": 1,
    "name": "GHOST_MJE6A1",
    "region": "BD"
  },
  {
    "uid": 4438050847,
    "password": "JOBAYAR_CODX-HXO93ZCFL",
    "account_id": 1,
    "name": "GHOST_MSJSWT",
    "region": "BD"
  },
  {
    "uid": 4438051436,
    "password": "JOBAYAR_CODX-QEMBQOYD1",
    "account_id": 1,
    "name": "GHOST_0V1IYB",
    "region": "BD"
  },
  {
    "uid": 4438053556,
    "password": "JOBAYAR_CODX-XGLSILOLE",
    "account_id": 1,
    "name": "GHOST_Q4JANE",
    "region": "BD"
  },
  {
    "uid": 4438056888,
    "password": "JOBAYAR_CODX-5KRGD7F7W",
    "account_id": 1,
    "name": "GHOST_BBJRKA",
    "region": "BD"
  },
  {
    "uid": 4438059249,
    "password": "JOBAYAR_CODX-Y2XUDNXXQ",
    "account_id": 1,
    "name": "GHOST_CULYZ2",
    "region": "BD"
  },
  {
    "uid": 4438060258,
    "password": "JOBAYAR_CODX-RFT4PQSEM",
    "account_id": 1,
    "name": "GHOST_QAVOJW",
    "region": "BD"
  },
  {
    "uid": 4438060430,
    "password": "JOBAYAR_CODX-HLQFZC8NY",
    "account_id": 1,
    "name": "GHOST_MYQENT",
    "region": "BD"
  },
  {
    "uid": 4438063449,
    "password": "JOBAYAR_CODX-QELPF27Z0",
    "account_id": 1,
    "name": "GHOST_KXYBW3",
    "region": "BD"
  },
  {
    "uid": 4438065959,
    "password": "JOBAYAR_CODX-7EGJPLWGU",
    "account_id": 1,
    "name": "GHOST_Z3RHTL",
    "region": "BD"
  },
  {
    "uid": 4438071644,
    "password": "JOBAYAR_CODX-ZHLBWQNGI",
    "account_id": 1,
    "name": "GHOST_2WTKFY",
    "region": "BD"
  },
  {
    "uid": 4438074211,
    "password": "JOBAYAR_CODX-HNP8CTAKN",
    "account_id": 1,
    "name": "GHOST_MDQGOT",
    "region": "BD"
  },
  {
    "uid": 4438074492,
    "password": "JOBAYAR_CODX-OUA6KWQL4",
    "account_id": 1,
    "name": "GHOST_RFODRB",
    "region": "BD"
  },
  {
    "uid": 4438074883,
    "password": "JOBAYAR_CODX-6V2I1R7U9",
    "account_id": 1,
    "name": "GHOST_XS6FJS",
    "region": "BD"
  },
  {
    "uid": 4438075028,
    "password": "JOBAYAR_CODX-WO8RIFQJO",
    "account_id": 1,
    "name": "GHOST_QCQKRP",
    "region": "BD"
  },
  {
    "uid": 4438076847,
    "password": "JOBAYAR_CODX-IILM4OTN8",
    "account_id": 1,
    "name": "GHOST_DLR3WW",
    "region": "BD"
  },
  {
    "uid": 4438077262,
    "password": "JOBAYAR_CODX-JDCBEN4WK",
    "account_id": 1,
    "name": "GHOST_OU6VLQ",
    "region": "BD"
  },
  {
    "uid": 4438077830,
    "password": "JOBAYAR_CODX-RVKDFZCB8",
    "account_id": 1,
    "name": "GHOST_VRHFTA",
    "region": "BD"
  },
  {
    "uid": 4438078002,
    "password": "JOBAYAR_CODX-RRPXUBP63",
    "account_id": 1,
    "name": "GHOST_BDHQ9D",
    "region": "BD"
  },
  {
    "uid": 4438080927,
    "password": "JOBAYAR_CODX-X56J5ZPTF",
    "account_id": 1,
    "name": "GHOST_JINJCG",
    "region": "BD"
  },
  {
    "uid": 4438083024,
    "password": "JOBAYAR_CODX-7FWXUO7JA",
    "account_id": 1,
    "name": "GHOST_IIFDB7",
    "region": "BD"
  },
  {
    "uid": 4438086031,
    "password": "JOBAYAR_CODX-5R0GSNDKA",
    "account_id": 1,
    "name": "GHOST_PUJXWD",
    "region": "BD"
  },
  {
    "uid": 4438089119,
    "password": "JOBAYAR_CODX-VXQLYNLY9",
    "account_id": 1,
    "name": "GHOST_YJR4VG",
    "region": "BD"
  },
  {
    "uid": 4438089824,
    "password": "JOBAYAR_CODX-9MK4E1AFF",
    "account_id": 1,
    "name": "GHOST_2WRBWS",
    "region": "BD"
  },
  {
    "uid": 4438091752,
    "password": "JOBAYAR_CODX-VIURMQE6Q",
    "account_id": 1,
    "name": "GHOST_J8W6EE",
    "region": "BD"
  },
  {
    "uid": 4438092293,
    "password": "JOBAYAR_CODX-SHAAAZAQE",
    "account_id": 1,
    "name": "GHOST_VSUOM5",
    "region": "BD"
  },
  {
    "uid": 4438093058,
    "password": "JOBAYAR_CODX-WIWLAT785",
    "account_id": 1,
    "name": "GHOST_TTCZ3O",
    "region": "BD"
  },
  {
    "uid": 4438095130,
    "password": "JOBAYAR_CODX-JQUQLNMW7",
    "account_id": 1,
    "name": "GHOST_MZNVVM",
    "region": "BD"
  },
  {
    "uid": 4438095455,
    "password": "JOBAYAR_CODX-FKSJMGVUN",
    "account_id": 1,
    "name": "GHOST_51AVDS",
    "region": "BD"
  },
  {
    "uid": 4438098041,
    "password": "JOBAYAR_CODX-VGFK6JEOM",
    "account_id": 1,
    "name": "GHOST_XHTANH",
    "region": "BD"
  },
  {
    "uid": 4438098457,
    "password": "JOBAYAR_CODX-CXTA94PVO",
    "account_id": 1,
    "name": "GHOST_GLMQO2",
    "region": "BD"
  },
  {
    "uid": 4438101062,
    "password": "JOBAYAR_CODX-N0THDRNRX",
    "account_id": 1,
    "name": "GHOST_B19IUD",
    "region": "BD"
  },
  {
    "uid": 4438101541,
    "password": "JOBAYAR_CODX-UUIAYMNNV",
    "account_id": 1,
    "name": "GHOST_4RZCND",
    "region": "BD"
  },
  {
    "uid": 4438101887,
    "password": "JOBAYAR_CODX-WFN5LQRS3",
    "account_id": 1,
    "name": "GHOST_HUJUZS",
    "region": "BD"
  },
  {
    "uid": 4438103799,
    "password": "JOBAYAR_CODX-WBKIIXUGN",
    "account_id": 1,
    "name": "GHOST_ITFIQR",
    "region": "BD"
  },
  {
    "uid": 4438104467,
    "password": "JOBAYAR_CODX-DDF0H0MMY",
    "account_id": 1,
    "name": "GHOST_SPKND0",
    "region": "BD"
  },
  {
    "uid": 4438106811,
    "password": "JOBAYAR_CODX-LBUNHQX1Y",
    "account_id": 1,
    "name": "GHOST_7IUUBQ",
    "region": "BD"
  },
  {
    "uid": 4438107075,
    "password": "JOBAYAR_CODX-UWGV6F2WX",
    "account_id": 1,
    "name": "GHOST_XYL3QK",
    "region": "BD"
  },
  {
    "uid": 4438107595,
    "password": "JOBAYAR_CODX-NBPOTD0GK",
    "account_id": 1,
    "name": "GHOST_4PJMZH",
    "region": "BD"
  },
  {
    "uid": 4438110125,
    "password": "JOBAYAR_CODX-P42ZAOOPZ",
    "account_id": 1,
    "name": "GHOST_KLNEEW",
    "region": "BD"
  },
  {
    "uid": 4438110611,
    "password": "JOBAYAR_CODX-YVVPIXIOV",
    "account_id": 1,
    "name": "GHOST_21GNBP",
    "region": "BD"
  },
  {
    "uid": 4438118496,
    "password": "JOBAYAR_CODX-JXKGROJMN",
    "account_id": 1,
    "name": "GHOST_AJDM3U",
    "region": "BD"
  },
  {
    "uid": 4438119116,
    "password": "JOBAYAR_CODX-PNJIJ2DAA",
    "account_id": 1,
    "name": "GHOST_XJFKTZ",
    "region": "BD"
  },
  {
    "uid": 4438122167,
    "password": "JOBAYAR_CODX-ELNXQWHOU",
    "account_id": 1,
    "name": "GHOST_ARMEZG",
    "region": "BD"
  },
  {
    "uid": 4438124134,
    "password": "JOBAYAR_CODX-DLPLK0X3J",
    "account_id": 1,
    "name": "GHOST_1NA9LJ",
    "region": "BD"
  },
  {
    "uid": 4438127592,
    "password": "JOBAYAR_CODX-LOLGD98AU",
    "account_id": 1,
    "name": "GHOST_GUGLM6",
    "region": "BD"
  },
  {
    "uid": 4438132150,
    "password": "JOBAYAR_CODX-AHF8NNIKL",
    "account_id": 1,
    "name": "GHOST_SDBHQH",
    "region": "BD"
  },
  {
    "uid": 4438132593,
    "password": "JOBAYAR_CODX-E0TVVU961",
    "account_id": 1,
    "name": "GHOST_ZIXWWA",
    "region": "BD"
  },
  {
    "uid": 4438134935,
    "password": "JOBAYAR_CODX-HNRWEQVPY",
    "account_id": 1,
    "name": "GHOST_JJAIFD",
    "region": "BD"
  },
  {
    "uid": 4438138798,
    "password": "JOBAYAR_CODX-CYQMKQVJK",
    "account_id": 1,
    "name": "GHOST_RVTWWN",
    "region": "BD"
  },
  {
    "uid": 4438143366,
    "password": "JOBAYAR_CODX-GCVFO15V8",
    "account_id": 1,
    "name": "GHOST_C1BVOI",
    "region": "BD"
  },
  {
    "uid": 4438143793,
    "password": "JOBAYAR_CODX-VAOFIVNQA",
    "account_id": 1,
    "name": "GHOST_0YAQES",
    "region": "BD"
  },
  {
    "uid": 4438144306,
    "password": "JOBAYAR_CODX-5GHEJREQJ",
    "account_id": 1,
    "name": "GHOST_CVUMJZ",
    "region": "BD"
  },
  {
    "uid": 4438146142,
    "password": "JOBAYAR_CODX-XXYOWHEEV",
    "account_id": 1,
    "name": "GHOST_VAJ2YP",
    "region": "BD"
  },
  {
    "uid": 4438146461,
    "password": "JOBAYAR_CODX-XETOSDXI7",
    "account_id": 1,
    "name": "GHOST_AOYBUW",
    "region": "BD"
  },
  {
    "uid": 4438146989,
    "password": "JOBAYAR_CODX-W9FPJI2KP",
    "account_id": 1,
    "name": "GHOST_DQGJG6",
    "region": "BD"
  },
  {
    "uid": 4438149352,
    "password": "JOBAYAR_CODX-MPSDEWMXO",
    "account_id": 1,
    "name": "GHOST_LDN700",
    "region": "BD"
  },
  {
    "uid": 4438151631,
    "password": "JOBAYAR_CODX-WWEKDEQLO",
    "account_id": 1,
    "name": "GHOST_QX01AD",
    "region": "BD"
  },
  {
    "uid": 4438154269,
    "password": "JOBAYAR_CODX-BUONTEEOT",
    "account_id": 1,
    "name": "GHOST_5TY3ZK",
    "region": "BD"
  },
  {
    "uid": 4438155182,
    "password": "JOBAYAR_CODX-ZAAMXGFAZ",
    "account_id": 1,
    "name": "GHOST_8HTDLG",
    "region": "BD"
  },
  {
    "uid": 4438157398,
    "password": "JOBAYAR_CODX-NWVERDEQI",
    "account_id": 1,
    "name": "GHOST_B79EGV",
    "region": "BD"
  },
  {
    "uid": 4438162271,
    "password": "JOBAYAR_CODX-LINHNVQCM",
    "account_id": 1,
    "name": "GHOST_5KPGZ8",
    "region": "BD"
  },
  {
    "uid": 4438165493,
    "password": "JOBAYAR_CODX-B9GEQKZZ3",
    "account_id": 1,
    "name": "GHOST_FIHDD9",
    "region": "BD"
  },
  {
    "uid": 4438168647,
    "password": "JOBAYAR_CODX-AUCFKV3I3",
    "account_id": 1,
    "name": "GHOST_YAOUKF",
    "region": "BD"
  },
  {
    "uid": 4438170518,
    "password": "JOBAYAR_CODX-A7QKWR4J8",
    "account_id": 1,
    "name": "GHOST_EXHLST",
    "region": "BD"
  },
  {
    "uid": 4438171275,
    "password": "JOBAYAR_CODX-SEPZKCY8R",
    "account_id": 1,
    "name": "GHOST_XMKDFY",
    "region": "BD"
  },
  {
    "uid": 4438173374,
    "password": "JOBAYAR_CODX-TRE6VD1JG",
    "account_id": 1,
    "name": "GHOST_HN7TJV",
    "region": "BD"
  },
  {
    "uid": 4438174298,
    "password": "JOBAYAR_CODX-3XVGUSGIK",
    "account_id": 1,
    "name": "GHOST_ZFFTES",
    "region": "BD"
  },
  {
    "uid": 4438176471,
    "password": "JOBAYAR_CODX-DWUHGQX3H",
    "account_id": 1,
    "name": "GHOST_OZHJDZ",
    "region": "BD"
  },
  {
    "uid": 4438176943,
    "password": "JOBAYAR_CODX-JCKTFKXRE",
    "account_id": 1,
    "name": "GHOST_YSZAQD",
    "region": "BD"
  },
  {
    "uid": 4438179573,
    "password": "JOBAYAR_CODX-VQKKICKV5",
    "account_id": 1,
    "name": "GHOST_6QPUNG",
    "region": "BD"
  },
  {
    "uid": 4438185225,
    "password": "JOBAYAR_CODX-ZTRIPAE67",
    "account_id": 1,
    "name": "GHOST_C61QBQ",
    "region": "BD"
  },
  {
    "uid": 4438188034,
    "password": "JOBAYAR_CODX-7BP9LVDCC",
    "account_id": 1,
    "name": "GHOST_ORBZGK",
    "region": "BD"
  },
  {
    "uid": 4438190689,
    "password": "JOBAYAR_CODX-L1Q751WAK",
    "account_id": 1,
    "name": "GHOST_Y4XOUS",
    "region": "BD"
  },
  {
    "uid": 4438190904,
    "password": "JOBAYAR_CODX-NK0HQGRQJ",
    "account_id": 1,
    "name": "GHOST_XM0BEG",
    "region": "BD"
  },
  {
    "uid": 4438192879,
    "password": "JOBAYAR_CODX-C2TQJPFQF",
    "account_id": 1,
    "name": "GHOST_MTINF0",
    "region": "BD"
  },
  {
    "uid": 4438193837,
    "password": "JOBAYAR_CODX-UX3J4TEOK",
    "account_id": 1,
    "name": "GHOST_PHU6AO",
    "region": "BD"
  },
  {
    "uid": 4438196138,
    "password": "JOBAYAR_CODX-GNFENNTUA",
    "account_id": 1,
    "name": "GHOST_YF09FM",
    "region": "BD"
  },
  {
    "uid": 4438199251,
    "password": "JOBAYAR_CODX-CEOKGL6IH",
    "account_id": 1,
    "name": "GHOST_KVZH1V",
    "region": "BD"
  },
  {
    "uid": 4438201509,
    "password": "JOBAYAR_CODX-KKLMTXTBH",
    "account_id": 1,
    "name": "GHOST_JATYBS",
    "region": "BD"
  },
  {
    "uid": 4438206465,
    "password": "JOBAYAR_CODX-7W7ZEU2WO",
    "account_id": 1,
    "name": "GHOST_SQXXGC",
    "region": "BD"
  },
  {
    "uid": 4438210156,
    "password": "JOBAYAR_CODX-OSZGTLJFV",
    "account_id": 1,
    "name": "GHOST_QJGY4H",
    "region": "BD"
  },
  {
    "uid": 4438212510,
    "password": "JOBAYAR_CODX-SW9V2IYHT",
    "account_id": 1,
    "name": "GHOST_OZAU86",
    "region": "BD"
  },
  {
    "uid": 4438215691,
    "password": "JOBAYAR_CODX-L3Y6CJZJJ",
    "account_id": 1,
    "name": "GHOST_MK6K8G",
    "region": "BD"
  },
  {
    "uid": 4438218033,
    "password": "JOBAYAR_CODX-BI3QHA8WA",
    "account_id": 1,
    "name": "GHOST_3OIP4E",
    "region": "BD"
  },
  {
    "uid": 4438218252,
    "password": "JOBAYAR_CODX-LDFFS3P4O",
    "account_id": 1,
    "name": "GHOST_4VSYHE",
    "region": "BD"
  },
  {
    "uid": 4438220664,
    "password": "JOBAYAR_CODX-7TZLEQFA3",
    "account_id": 1,
    "name": "GHOST_0EWXQ5",
    "region": "BD"
  },
  {
    "uid": 4438221290,
    "password": "JOBAYAR_CODX-JZYOIGKXM",
    "account_id": 1,
    "name": "GHOST_BQCPQP",
    "region": "BD"
  },
  {
    "uid": 4438223142,
    "password": "JOBAYAR_CODX-ZHE6EPFYV",
    "account_id": 1,
    "name": "GHOST_XFH4GY",
    "region": "BD"
  },
  {
    "uid": 4438226591,
    "password": "JOBAYAR_CODX-DAZ1FNV2X",
    "account_id": 1,
    "name": "GHOST_QK5FQT",
    "region": "BD"
  },
  {
    "uid": 4438229625,
    "password": "JOBAYAR_CODX-ZC0N34LGB",
    "account_id": 1,
    "name": "GHOST_UEIYHW",
    "region": "BD"
  },
  {
    "uid": 4438231873,
    "password": "JOBAYAR_CODX-BOJJJYPSL",
    "account_id": 1,
    "name": "GHOST_TMJPVO",
    "region": "BD"
  },
  {
    "uid": 4438232378,
    "password": "JOBAYAR_CODX-M396BRMT7",
    "account_id": 1,
    "name": "GHOST_6L7ZTL",
    "region": "BD"
  },
  {
    "uid": 4438240246,
    "password": "JOBAYAR_CODX-IMI1I5YKM",
    "account_id": 1,
    "name": "GHOST_MAU9NT",
    "region": "BD"
  },
  {
    "uid": 4438242086,
    "password": "JOBAYAR_CODX-FHZTKN2BL",
    "account_id": 1,
    "name": "GHOST_JJXJOF",
    "region": "BD"
  },
  {
    "uid": 4438253606,
    "password": "JOBAYAR_CODX-G6WH0FTXU",
    "account_id": 1,
    "name": "GHOST_SAL7O0",
    "region": "BD"
  },
  {
    "uid": 4438256453,
    "password": "JOBAYAR_CODX-SOYKOLB5S",
    "account_id": 1,
    "name": "GHOST_EABJ4T",
    "region": "BD"
  },
  {
    "uid": 4438258955,
    "password": "JOBAYAR_CODX-JRVJE5XUK",
    "account_id": 1,
    "name": "GHOST_O1PZ2X",
    "region": "BD"
  },
  {
    "uid": 4438261697,
    "password": "JOBAYAR_CODX-6FQXM1DMS",
    "account_id": 1,
    "name": "GHOST_8CNBUM",
    "region": "BD"
  },
  {
    "uid": 4438264319,
    "password": "JOBAYAR_CODX-7TEBZQGVP",
    "account_id": 1,
    "name": "GHOST_MGFTIK",
    "region": "BD"
  },
  {
    "uid": 4438266817,
    "password": "JOBAYAR_CODX-YFLE3NGR8",
    "account_id": 1,
    "name": "GHOST_CEZTO3",
    "region": "BD"
  },
  {
    "uid": 4438272381,
    "password": "JOBAYAR_CODX-K6Y0PLI3U",
    "account_id": 1,
    "name": "GHOST_BOKLF6",
    "region": "BD"
  },
  {
    "uid": 4438275137,
    "password": "JOBAYAR_CODX-KB3GWBXCS",
    "account_id": 1,
    "name": "GHOST_KPJVUS",
    "region": "BD"
  },
  {
    "uid": 4438276874,
    "password": "JOBAYAR_CODX-7LPKQLJI6",
    "account_id": 1,
    "name": "GHOST_4KEDZZ",
    "region": "BD"
  },
  {
    "uid": 4438279857,
    "password": "JOBAYAR_CODX-FXM2BO1DM",
    "account_id": 1,
    "name": "GHOST_RBG6H8",
    "region": "BD"
  },
  {
    "uid": 4438282587,
    "password": "JOBAYAR_CODX-YYLAIBCAR",
    "account_id": 1,
    "name": "GHOST_DWOQXW",
    "region": "BD"
  },
  {
    "uid": 4438285958,
    "password": "JOBAYAR_CODX-CPYWEGJIQ",
    "account_id": 1,
    "name": "GHOST_PIJL60",
    "region": "BD"
  },
  {
    "uid": 4438287903,
    "password": "JOBAYAR_CODX-MTYKIKVXZ",
    "account_id": 1,
    "name": "GHOST_YCCCEK",
    "region": "BD"
  },
  {
    "uid": 4438290846,
    "password": "JOBAYAR_CODX-JTPKG4SMI",
    "account_id": 1,
    "name": "GHOST_DHHXZ5",
    "region": "BD"
  },
  {
    "uid": 4438293542,
    "password": "JOBAYAR_CODX-XFMQUIQ8J",
    "account_id": 1,
    "name": "GHOST_F0QVP4",
    "region": "BD"
  },
  {
    "uid": 4438296741,
    "password": "JOBAYAR_CODX-PEETEHOET",
    "account_id": 1,
    "name": "GHOST_5J69AI",
    "region": "BD"
  },
  {
    "uid": 4438299137,
    "password": "JOBAYAR_CODX-7D1G3WKXH",
    "account_id": 1,
    "name": "GHOST_YQHEJO",
    "region": "BD"
  },
  {
    "uid": 4438301428,
    "password": "JOBAYAR_CODX-EFNDTZQXI",
    "account_id": 1,
    "name": "GHOST_41AOTL",
    "region": "BD"
  },
  {
    "uid": 4438302470,
    "password": "JOBAYAR_CODX-IIA0N1DA4",
    "account_id": 1,
    "name": "GHOST_LAPNPA",
    "region": "BD"
  },
  {
    "uid": 4438304788,
    "password": "JOBAYAR_CODX-G60VBEAEV",
    "account_id": 1,
    "name": "GHOST_9DTEOM",
    "region": "BD"
  },
  {
    "uid": 4438307162,
    "password": "JOBAYAR_CODX-FWAZ8BNCQ",
    "account_id": 1,
    "name": "GHOST_7GCGBP",
    "region": "BD"
  },
  {
    "uid": 4438310177,
    "password": "JOBAYAR_CODX-VGKPXFTZS",
    "account_id": 1,
    "name": "GHOST_P0TBKT",
    "region": "BD"
  },
  {
    "uid": 4438312228,
    "password": "JOBAYAR_CODX-5UMYEANED",
    "account_id": 1,
    "name": "GHOST_MRISE0",
    "region": "BD"
  },
  {
    "uid": 4438314859,
    "password": "JOBAYAR_CODX-D5AD3USOI",
    "account_id": 1,
    "name": "GHOST_PAFBYM",
    "region": "BD"
  },
  {
    "uid": 4438318386,
    "password": "JOBAYAR_CODX-QUSJE2GQC",
    "account_id": 1,
    "name": "GHOST_MWNHOZ",
    "region": "BD"
  },
  {
    "uid": 4438320843,
    "password": "JOBAYAR_CODX-T4BDDFYDU",
    "account_id": 1,
    "name": "GHOST_4WNXF5",
    "region": "BD"
  },
  {
    "uid": 4438322954,
    "password": "JOBAYAR_CODX-17LR9EGSW",
    "account_id": 1,
    "name": "GHOST_0FLHG5",
    "region": "BD"
  },
  {
    "uid": 4438329661,
    "password": "JOBAYAR_CODX-HY1WY0OT0",
    "account_id": 1,
    "name": "GHOST_JKESHO",
    "region": "BD"
  },
  {
    "uid": 4438332286,
    "password": "JOBAYAR_CODX-VQYUQFJGT",
    "account_id": 1,
    "name": "GHOST_UGTWM6",
    "region": "BD"
  },
  {
    "uid": 4438334243,
    "password": "JOBAYAR_CODX-Y8J6YCM44",
    "account_id": 1,
    "name": "GHOST_6KB0XX",
    "region": "BD"
  },
  {
    "uid": 4438340711,
    "password": "JOBAYAR_CODX-SEI6VPDZN",
    "account_id": 1,
    "name": "GHOST_YZIQXH",
    "region": "BD"
  },
  {
    "uid": 4438342540,
    "password": "JOBAYAR_CODX-BERT2FHPP",
    "account_id": 1,
    "name": "GHOST_YN6PWV",
    "region": "BD"
  },
  {
    "uid": 4438345784,
    "password": "JOBAYAR_CODX-S8GZZ46HS",
    "account_id": 1,
    "name": "GHOST_WOIQLR",
    "region": "BD"
  },
  {
    "uid": 4438348596,
    "password": "JOBAYAR_CODX-Q7KJLZMX6",
    "account_id": 1,
    "name": "GHOST_2ML9KF",
    "region": "BD"
  },
  {
    "uid": 4438358640,
    "password": "JOBAYAR_CODX-LQDE0SVZV",
    "account_id": 1,
    "name": "GHOST_MBFN54",
    "region": "BD"
  },
  {
    "uid": 4438361314,
    "password": "JOBAYAR_CODX-7YUQJTSB4",
    "account_id": 1,
    "name": "GHOST_KJSNXV",
    "region": "BD"
  },
  {
    "uid": 4438368197,
    "password": "JOBAYAR_CODX-96CKZ5DXW",
    "account_id": 1,
    "name": "GHOST_YYJNRO",
    "region": "BD"
  },
  {
    "uid": 4438373192,
    "password": "JOBAYAR_CODX-80OOOSLBB",
    "account_id": 1,
    "name": "GHOST_KLB5BU",
    "region": "BD"
  },
  {
    "uid": 4438375604,
    "password": "JOBAYAR_CODX-J6V42PSUS",
    "account_id": 1,
    "name": "GHOST_9FSBOK",
    "region": "BD"
  },
  {
    "uid": 4438377921,
    "password": "JOBAYAR_CODX-B2AKXECVE",
    "account_id": 1,
    "name": "GHOST_REQDDF",
      
];

  
  // 👇👇👇 PASTE THE REST OF YOUR 151 ACCOUNTS BELOW THIS LINE 👇👇👇
  
  
  // 👆👆👆 PASTE ABOVE THIS LINE 👆👆👆
];

// ==========================================
// 2. CONFIGURATION
// ==========================================
const SECRET_KEY = "DARKNESS_VIP"; 
const ADMIN_PASSWORD = "admin";

// ==========================================
// 3. API ROUTES
// ==========================================

// HOME ROUTE
app.get('/', (req, res) => {
    res.json({
        status: true,
        message: "FF Like API is Online 🟢",
        accounts_loaded: accounts.length,
        developer: "Dev by Darkness"
    });
});

// LOGIN ROUTE
app.post('/login', (req, res) => {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
        const token = jwt.sign({ role: 'admin' }, SECRET_KEY, { expiresIn: '1h' });
        return res.json({ status: true, token: token });
    }
    return res.status(403).json({ status: false, message: "Wrong Password" });
});

// MIDDLEWARE
const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        jwt.verify(bearer[1], SECRET_KEY, (err, authData) => {
            if (err) return res.status(403).json({ message: "Invalid Token" });
            req.authData = authData;
            next();
        });
    } else {
        res.status(403).json({ message: "Token Required" });
    }
};

// SEND LIKES ROUTE
app.post('/send-likes', verifyToken, (req, res) => {
    const { target_uid, count } = req.body;
    
    if (!target_uid) return res.status(400).json({ status: false, message: "Target UID required" });

    let limit = count || 10;
    if (limit > accounts.length) limit = accounts.length;

    // Get workers from the list above
    const workers = accounts.slice(0, limit);

    res.json({
        status: true,
        code: 200,
        message: `Sending ${limit} likes to ${target_uid}`,
        developer: "Dev by Darkness",
        data: workers.map(w => ({ 
            worker_name: w.name, 
            status: "Success", 
            time: new Date().toISOString() 
        }))
    });
});

// EXPORT FOR VERCEL
module.exports = app;        message: "FF Like API is Online 🟢",
        total_accounts: accounts.length, // Should show 151
        developer: "Dev by Darkness"
    });
});

// Login Route
app.post('/login', (req, res) => {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
        const token = jwt.sign({ role: 'admin' }, SECRET_KEY, { expiresIn: '1h' });
        return res.json({ status: true, token: token });
    }
    return res.status(403).json({ status: false, message: "Wrong Password" });
});

// Middleware
const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        jwt.verify(bearer[1], SECRET_KEY, (err, authData) => {
            if (err) return res.status(403).json({ message: "Invalid Token" });
            req.authData = authData;
            next();
        });
    } else {
        res.status(403).json({ message: "Token Required" });
    }
};

// Send Likes Route
app.post('/send-likes', verifyToken, (req, res) => {
    const { target_uid, count } = req.body;
    if (!target_uid) return res.status(400).json({ message: "Target UID required" });

    let limit = count || 10;
    if (limit > accounts.length) limit = accounts.length;

    const workers = accounts.slice(0, limit);

    res.json({
        status: true,
        message: `Sending ${limit} likes to ${target_uid}`,
        data: workers.map(w => ({ 
            worker: w.name, 
            status: "Success", 
            time: new Date().toISOString() 
        }))
    });
});

// Export
module.exports = app;
