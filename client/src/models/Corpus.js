import {apiMethod, HitApi} from "./index";


export const ApiCorpus = () => {
    const LoadCorpus = async (corpusId, token) => {
        try {
            const apiRequest = {
                method: apiMethod.GET
                , url: '/corpuses/' + corpusId
                , headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await HitApi(apiRequest)
            return data
        } catch (error) {
            throw error.response.data.message;
        }
    }

    const DeleteCorpus = async (corpusId, token) => {
        try {
            const apiRequest = {
                method: apiMethod.DELETE
                , url: '/corpuses/delete?id=' + corpusId
                , headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await HitApi(apiRequest)
            return data
        } catch (error) {
            throw error.response.data.message;
        }
    }

    const SaveCorpus = async (corpus, token) => {
        try {
            const apiRequest = {
                method: apiMethod.POST
                , url: '/corpuses/register'
                , data: {
                    corpus: corpus
                }
                , headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await HitApi(apiRequest)
            return data
        } catch (error) {
            throw error.response.data.message;
        }
    }

    const GetCorpusList = async (token) => {
        try {
            const apiRequest = {
                method: apiMethod.GET
                , url: '/corpuses'
                , headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await HitApi(apiRequest)
            return data
        } catch (error) {
            throw error.response.data.message;
        }
    }

    return {
        LoadCorpus
        , DeleteCorpus
        , SaveCorpus
        , GetCorpusList
    }
}