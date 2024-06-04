import request from './request'


const prePath = '/history';

const queryHistory = (params) => {
    const path = `${prePath}/getHistory`;
    return request(
        {
            url: path,
            method: 'get',
            params,
        }
    )
}

const setHistory = (data) => {
    const path = `${prePath}/setHistory`;
    return request(
        {
            url: path,
            method: 'post',
            data,
        }
    )
}

export default { queryHistory, setHistory }