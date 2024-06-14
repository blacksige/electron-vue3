/**
 * 获取当前机器的ip地址
 */
module.exports = {
    getIpAddress: function () {
        const os = require("os");
        let ifaces = os.networkInterfaces();
        for (let dev in ifaces) {
            let iface = ifaces[dev];
            for (let i = 0; i < iface.length; i++) {
                let { family, address, internal } = iface[i];
                if (family === "IPv4" && address !== "127.0.0.1" && !internal) {
                    return address;
                }
            }
        }
    },
    getIp: function () {
        const os = require("os");
        const osType = os.type(); //系统类型
        const netInfo = os.networkInterfaces(); //网络信息
        let ip = "";
        if (osType === "Windows_NT") {
            for (let dev in netInfo) {
                //win7的网络信息中显示为本地连接，win10显示为以太网
                if (dev === "本地连接" || dev === "以太网") {
                    for (let j = 0; j < netInfo[dev].length; j++) {
                        if (netInfo[dev][j].family === "IPv4") {
                            ip = netInfo[dev][j].address;
                            break;
                        }
                    }
                }
            }
        } else if (osType === "Linux") {
            ip = netInfo.eth0[0].address;
        } else if (osType === "Darwin") {
            // mac操作系统
            // ip = netInfo.eth0[0].address;
        } else {
            // 其他操作系统
        }

        return ip;
    },
    getClientIp: function (req) {
        return req.headers['x-forwarded-for'] ||
            req.ip ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress ||
            '';
    }
};