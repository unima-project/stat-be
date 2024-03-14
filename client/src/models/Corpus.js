import axios from "axios";
import {baseUrl} from "./index";

export const LoadCorpus = async (corpusId, auth) => {
    try {
        const {data} = await axios.get(baseUrl + '/corpuses/' + corpusId, {
            headers: {
                Authorization: `Bearer ${auth}`
            }
        })

        return data
    } catch (error) {
        throw error.response.data.message;
    }
}

export const DeleteCorpus = async (corpusId, auth) => {
    try {
        const {data} = await axios.delete(baseUrl + '/corpuses/delete?id=' + corpusId, {
            headers: {
                Authorization: `Bearer ${auth}`
            }
        })

        return data
    } catch (error) {
        throw error.response.data.message;
    }
}

export const SaveCorpus = async (corpus, auth) => {
    try {
        const {data} = await axios.post(baseUrl + '/corpuses/register', {
            corpus
        }, {
            headers: {
                Authorization: `Bearer ${auth}`
            }
        })

        return data
    } catch (error) {
        throw error.response.data.message;
    }
}

export const GetCorpusList = async (auth) => {
    try {
        const {data} = await axios.get(baseUrl + '/corpuses', {
            headers: {
                Authorization: `Bearer ${auth}`
            }
        })
        return data
    } catch (error) {
        throw error.response.data.message;
    }
}