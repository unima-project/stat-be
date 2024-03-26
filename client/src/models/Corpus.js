import {apiMethod, HitApi} from "./index";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonIcon from "@mui/icons-material/Person";
import * as React from "react";


export const ApiCorpus = () => {
    const corpusPublicStatus = {
        PRIVATE: {
            label: "PRIVATE"
            , value: 0
        }
        , PUBLIC: {
            label: "PUBLIC"
            , value: 1
        }
    }

    const corpusPublicStatusConfig = {
        0: {
            value:corpusPublicStatus.PRIVATE.value
            , label: corpusPublicStatus.PRIVATE.label
            , color: "error"
        }
        , 1: {
            value:corpusPublicStatus.PUBLIC.value
            , label: corpusPublicStatus.PUBLIC.label
            , color: "success"
        }
    }


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

    const LoadPublicCorpus = async (corpusId) => {
        try {
            const apiRequest = {
                method: apiMethod.GET
                , url: '/corpuses/publics/' + corpusId
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

    const UpdateCorpusPublicStatus = async (corpus, token) => {
        try {
            const apiRequest = {
                method: apiMethod.PATCH
                , url: '/corpuses/publics/update'
                , data: corpus
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

    const GetPublicCorpusList = async () => {
        try {
            const apiRequest = {
                method: apiMethod.GET
                , url: '/corpuses/publics'
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
        , UpdateCorpusPublicStatus

        , corpusPublicStatus
        , corpusPublicStatusConfig
        , GetPublicCorpusList
        , LoadPublicCorpus
    }
}