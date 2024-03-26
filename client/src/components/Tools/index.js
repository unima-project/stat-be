import React from 'react';
import Box from "@mui/system/Box";
import MainController from "./MainController";
import {Result} from "../Results";
import Typography from "@mui/material/Typography";
import {alertSeverity} from "../commons/Alert";
import {Loading} from "../commons/Loading";
import {confirmationConfigDefault, ModalConfirmation} from "../commons/Confirmation";
import {useNavigate} from "react-router-dom";
import {UserProfile} from "../../Helpers/userProfile";
import {Corpus} from "../Corpuses";
import {GetTokenList, LoadCorpus, LoadPublicCorpus} from "../../models";
import {SetupCookies} from "../../Helpers/cookie";
import {RemoveDuplicateItemList} from "../../Helpers/list";

export const Tool = () => {
    const [tokens, setTokens] = React.useState([]);
    const [alertStatus, setAlertStatus] = React.useState({
        message: "", severity: alertSeverity.INFO
    });
    const [keyword, setKeyword] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [confirmationConfig, setConfirmationConfig] = React.useState(confirmationConfigDefault);
    const navigate = useNavigate();
    const {isAdmin, isMember} = UserProfile();
    const {cookie} = SetupCookies();
    const [text, setText] = React.useState("");

    React.useEffect(() => {
        if (isAdmin) {
            navigate("/users")
        }
    }, [isAdmin, isMember, cookie])

    const setupKeyword = (word) => {
        if (word === keyword) {
            setKeyword("");
        } else {
            setKeyword(word);
        }
    }

    const errorState = () => {
        setText("");
        setTokens([]);
    }

    const loadCurrentAllCorpus = (corpusId, isDownload) => {
        LoadCorpus(corpusId, cookie.token)
            .then(async (data) => {
                await getTokenList(data.data.corpus, isDownload);
            })
            .catch(error => {
                setAlertStatus({
                    severity: alertSeverity.ERROR
                    , message: `load corpus: ${error}`
                })
            })
            .finally(() => {
                setLoading(false);
            })
    }

    const loadCurrentPublicCorpus = (corpusId, isDownload) => {
        LoadPublicCorpus(corpusId)
            .then(async (data) => {
                await getTokenList(data.data.corpus, isDownload);
            })
            .catch(error => {
                setAlertStatus({
                    severity: alertSeverity.ERROR
                    , message: `load corpus: ${error}`
                })
            })
            .finally(() => {
                setLoading(false);
            })
    }

    const exportToken = (token) => {
        const uniqueToken = RemoveDuplicateItemList(token);
        const blob = new Blob([uniqueToken], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.download = "token.txt";
        link.href = url;
        link.click();
    }

    const loadCurrentCorpus = (corpusId, isDownload) => {
        setLoading(true);

        if (isMember) {
            loadCurrentAllCorpus(corpusId, isDownload);
        } else {
            loadCurrentPublicCorpus(corpusId, isDownload);
        }
    }

    const getTokenList = async (text, isDownload) => {
        setLoading(true);

        try {
            const data = await GetTokenList(text)
            setTokens(data.data.token);
            setText(data.data.corpus);

            if (isDownload) exportToken(data.data.token);
        } catch (error) {
            setAlertStatus({
                severity: alertSeverity.ERROR
                , message: `get token list: ${error}`
            })
            errorState();
        }
    }

    return (
        <>
            <Loading open={loading}/>
            <ModalConfirmation confirmationConfig={confirmationConfig}/>
            <Box sx={{marginTop: 10, textAlign: 'center'}}>
                <Typography
                    noWrap
                    variant="h5"
                    sx={{
                        color: 'inherit',
                        fontWeight: 700,
                    }}
                >
                    Simple Text Analysis Tool
                </Typography>
                {
                    isMember ?
                        <MainController
                            tokens={tokens}
                            setTokens={setTokens}
                            alertStatus={alertStatus}
                            setAlertStatus={setAlertStatus}
                            setKeyword={setKeyword}
                            setLoading={setLoading}
                            setConfirmationConfig={setConfirmationConfig}
                            isMember={isMember}
                            cookie={cookie}
                            loadCurrentCorpus={loadCurrentCorpus}
                            text={text}
                            setText={setText}
                            getTokenList={getTokenList}
                            errorState={errorState}
                        /> :
                        <Box sx={{marginTop: 3, textAlign: 'center'}}>
                            <Corpus
                                setConfirmationConfig={setConfirmationConfig}
                                loadCurrentCorpus={loadCurrentCorpus}
                                alertStatus={alertStatus}
                            />
                        </Box>
                }
                {
                    tokens.length > 0 ?
                        <Result
                            tokens={tokens}
                            setupKeyword={setupKeyword}
                            setAlertStatus={setAlertStatus}
                            keyword={keyword}
                        /> : <></>
                }
            </Box>
        </>
    )
}