import React from "react"
import styled from "styled-components"
import { connect } from "react-redux"
import { push } from 'connected-react-router';
import { routes } from '../Router';
import { fetchFeed, createPost } from "../../actions/posts"
import { setLogged } from "../../actions/menu"
import Post from "../../components/Post"
import { ButtonCustom } from '../../style/style';
import { TextField } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { classes } from '../../style/theme';

const postForm = [
    {
        name: "title",
        label: "Titulo do post",
        type: "text",
        required: true,
        title: "Titulo do post",
    },
    {
        name: "text",
        label: "Texto do post",
        type: "text",
        required: true,
        title: "Texto do post",
    }
]

const NewPostWrapper = styled(Card)`
    width: 480px;
    margin-left: auto;
    margin-right: auto;
`

const FormCustom = styled.form`
    gap: 10px;
  place-content: center;
  justify-items: center;
  display: grid;
`

let token = window.localStorage.getItem("token")

class Feed extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            form: {}
        }
    }

    componentDidMount() {
        token = window.localStorage.getItem("token")

        if (token === null) {
            this.props.setLogged(false)
            this.props.goToLogin()
        }
        else {
            this.props.setLogged(true)
            this.props.fetchFeed(token)
        }
    }

    handleFormChange = (e) => {
        const { name, value } = e.target
        this.setState({
            form: {
                ...this.state.form,
                [name]: value
            }
        })
    }

    listFeed = () => {
        return (
            <div>
                <h2>Feed</h2>
                {this.props.feedList.map(post => {
                    return (
                        <Post key={post.id} post={post} auth={token} />
                    )
                })}
            </div>
        )
    }

    render() {
        return (
            <div>
                <NewPostWrapper className={classes.card}>
                    <CardContent>
                        <FormCustom onSubmit={(event) => {
                            event.preventDefault()
                            this.props.createPost(this.state.form, token)
                        }}>
                            {postForm.map((form) => {
                                if (form.type === "text") {
                                    return (
                                        <div key={form.name}>
                                            <TextField
                                                id={form.name}
                                                name={form.name}
                                                label={form.label}
                                                type={form.type}
                                                value={this.state.form[form.name] || ""}
                                                required={form.required}
                                                onChange={this.handleFormChange}
                                            />
                                        </div>
                                    )
                                }
                                return (
                                    <div>Tipo de formulário não encontrado</div>
                                )

                            })
                            }
                            <ButtonCustom type="submit">Criar post</ButtonCustom>
                        </FormCustom>
                    </CardContent>
                </NewPostWrapper>
                {this.props.feedList !== undefined ? this.listFeed() : <div>Carregando...</div>}
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        feedList: state.posts.feed
    }
}

const mapDispatchToProps = dispatch => ({
    fetchFeed: (auth) => dispatch(fetchFeed(auth)),
    createPost: (post, auth) => dispatch(createPost(post, auth)),
    goToLogin: () => dispatch(push(routes.login)),
    setLogged: (logged) => dispatch(setLogged(logged))
})

export default connect(mapStateToProps, mapDispatchToProps)(Feed);