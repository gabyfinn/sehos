"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//*                               ,,~~~~~~,,..
//*                               ...., ,'~             |
//*                               \    V                /
//*                                \  /                 /
//*                                ;####>     @@@@@     )
//*                                ##;,      @@@@@@@    )
//*                             .##/  ~>      @@@@@   .   .
//*                            ###''#>              '      '
//*        .:::::::.      ..###/ #>               '         '
//*       //////))))----~~ ## #}                '            '
//*     ///////))))))                          '             '
//*    ///////)))))))\      SEHOS STORE       '              '
//*   //////)))))))))))                      '               '
//*   |////)))))))))))))____________________________________).
//*  |||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//*  ````````````````````````````'''''''''''''''''''''''''''''
//* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const app_1 = __importDefault(require("./src/app"));
const db_1 = require("./src/db");
const PORT = process.env.PORT || 3001;
app_1.default.listen(PORT, () => {
    console.log(`App runing at http://localhost:${PORT}`);
    db_1.sequelize
        .authenticate()
        .then(() => __awaiter(void 0, void 0, void 0, function* () {
        console.log('Database conected');
        try {
            yield db_1.sequelize.sync({ alter: true }); //alter or force
        }
        catch (error) {
            console.log(error.message);
        }
    }))
        .catch((e) => {
        console.log(e.message);
    });
});
// sequelize.sync({ alter: true }).then(() => {
//   server.listen(PORT, () => {
//     console.log('%s listening at 3001'); // eslint-disable-line no-console
//   });
// });
