import {apiMethod, HitApi} from "./index";

export const ApiNltk = () => {
    const GetCollocationList = async (tokens) => {
        try {
            const apiRequest = {
                method: apiMethod.POST
                , url: '/nltk/collocates'
                , data: {tokens: tokens}
            }

            const {data} = await HitApi(apiRequest)
            return data
        } catch (error) {
            throw error.response.data.message;
        }
    };

    const GetTokenList = async (text) => {
        try {
            const apiRequest = {
                method: apiMethod.POST
                , url: '/nltk/tokens'
                , data: {text: text}
            }

            const {data} = await HitApi(apiRequest)
            return data
        } catch (error) {
            throw error.response.data.message;
        }
    }

    const GetTokenListUpload = async (formData) => {
        try {
            const apiRequest = {
                method: apiMethod.POST
                , url: '/nltk/tokens/upload'
                , data: formData
            }

            const {data} = await HitApi(apiRequest)
            return data
        } catch (error) {
            throw error.response.data.message;
        }
    }

    const GetConcordanceList = async (tokens, width) => {
        try {
            const apiRequest = {
                method: apiMethod.POST
                , url: '/nltk/concordances'
                , data: {width: width, tokens: tokens}
            }

            const {data} = await HitApi(apiRequest)
            return data
        } catch (error) {
            throw error.response.data.message;
        }
    };

    const GetWordFreqList = async (tokens) => {
        try {
            const apiRequest = {
                method: apiMethod.POST
                , url: '/nltk/word_frequencies'
                , data: {tokens: tokens}
            }

            const {data} = await HitApi(apiRequest)
            return data
        } catch (error) {
            throw error.response.data.message;
        }
    };

    const GetNgramList = async (tokens, size) => {
        try {
            const apiRequest = {
                method: apiMethod.POST
                , url: '/nltk/ngrams'
                , data: {tokens: tokens, size: size}
            }

            const {data} = await HitApi(apiRequest)
            return data
        } catch (error) {
            throw error.response.data.message;
        }
    };

    return {
        GetCollocationList
        , GetTokenList
        , GetTokenListUpload
        , GetConcordanceList
        , GetWordFreqList

        , GetNgramList
    }
}