import request from './request'


const prePath = '/enterdata';

const queryEnterData = (params) => {
    const path = `${prePath}/getAllData`;
    return request(
        {
            url: path,
            method: 'get',
            params,
        }
    )
}

const setEnterData = (data) => {
    const path = `${prePath}/setAllData`;
    return request(
        {
            url: path,
            method: 'post',
            data,
        }
    )
}

const deleteEnterData = (data) => {
    const path = `${prePath}/deleteData`;
    return request(
        {
            url: path,
            method: 'post',
            data,
        }
    )
}

export default { queryEnterData, setEnterData, deleteEnterData }