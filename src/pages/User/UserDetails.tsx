import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Typography, CircularProgress, Paper } from "@mui/material";
import { editUser, getUserDetail } from "../../redux/slice/user.slice";
import { AppDispatch, RootState } from "../../redux/slice/store";
import { deletePost, editPost, getPostList } from "../../redux/slice/post.slice";
import EditModal from "../../components/EditModal";
import DeleteModal from "../../components/DeleteModal";
import EditUser from "../../components/EditUser";
import { Post } from "../../types/post/Post";
import { styled } from '@mui/material/styles';
import MuiGrid from '@mui/material/Grid';


const Card = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    position: "relative",
}))

const UserDetail = () => {
    const [users, setUsers] = useState<any>([]);
    const [posts, setPosts] = useState<any>([]);
    const { id } = useParams<any>();
    const dispatch = useDispatch<AppDispatch>();
    const { loadingUsers } = useSelector(
        (state: RootState) => state.users
    );

    const { loadingPosts } = useSelector(
        (state: RootState) => state.posts
    );

    useEffect(() => {
        if (id) {
            dispatch(getUserDetail(Number(id)))
                .then((res) => {
                    setUsers(res.payload)
                });
            dispatch(getPostList(Number(id)))
                .then((res) => {
                    setPosts(res.payload)
                });
        }
    }, [dispatch, id]);


    const onUserEdit = async (
        id: number,
        fullName: string,
        phone: string,
        username: string,
        email: string,
        company: string,
        companyCatchPhrase: string,
        city: string,
        street: string,
        suite: string,
        zipcode: string) => {
        const dataObg = {
            id: id,
            name: fullName,
            phone: phone,
            username: username,
            email: email,
            company: {
                name: company,
                catchPhrase: companyCatchPhrase
            },
            address: {
                street: street,
                city: city,
                zipcode: zipcode,
                suite: suite
            }
        }

        dispatch(editUser(dataObg))
            .then((res) => {
                if (res.payload) {
                    let updatedUserObj = { ...users };
                    const updatedUsers = {
                        id: id,
                        name: res.payload.name,
                        phone: res.payload.phone,
                        username: res.payload.username,
                        email: res.payload.email,
                        company: {
                            name: res.payload.company.name,
                            catchPhrase: res.payload.company.catchPhrase
                        },
                        address: {
                            street: res.payload.address.street,
                            city: res.payload.address.city,
                            zipcode: res.payload.address.zipcode,
                            suite: res.payload.address.suite
                        }
                    };
                    updatedUserObj = { ...updatedUserObj, ...updatedUsers };
                    setUsers(updatedUserObj);
                }
            });
    };

    const onPostDelete = (id: number) => {
        dispatch(deletePost(Number(id)))
            .then(() => {
                let newPostArr = [...posts];
                const postById = newPostArr.findIndex((obj: Post) => obj.id === id);

                if (postById > -1) {
                    newPostArr.splice(postById, 1);
                }
                setPosts(newPostArr);
            });
    }

    const onPostEdit = (data: any) => {
        dispatch(editPost(data))
            .then(() => {
                let newPostArr = [...posts];
                const postById = newPostArr.findIndex((obj: Post) => obj.id === data.id);
                newPostArr[Number(postById)] = data;
                setPosts(newPostArr);
            });
    }


    return loadingUsers || loadingPosts ? (
        <MuiGrid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            <CircularProgress />
        </MuiGrid>
    ) : (
        <>
            <EditUser
                fullName={users?.name}
                phone={users?.phone}
                username={users?.username}
                email={users?.email}
                company={users.company?.name}
                companyCatchPhrase={users?.company?.catchPhrase}
                city={users?.address?.city}
                street={users?.address?.street}
                suite={users?.address?.suite}
                zipcode={users?.address?.zipcode}
                id={users?.id}
                onEdit={onUserEdit}
            />
            <MuiGrid container margin={"normal"} alignItems={"center"} spacing={4}>
                {posts.length > 1 ? (
                    posts.map((each: Post) => (
                        <MuiGrid item xs={10} sm={5} md={3} key={each.id}>
                            <Card elevation={10}>
                                <MuiGrid container justifyContent="center">
                                    id: {each.id}
                                    <MuiGrid item xs={12}>
                                        <MuiGrid container spacing={3} justifyContent="space-between">
                                            <MuiGrid item>
                                                <DeleteModal key={each.id} post={each} onDelete={onPostDelete} />
                                            </MuiGrid>
                                            <MuiGrid item>
                                                <EditModal key={each.id} post={each} onEdit={onPostEdit} />
                                            </MuiGrid>
                                        </MuiGrid>
                                    </MuiGrid>
                                    <Typography>Title: {each.title}</Typography>
                                    <Typography>Body: {each.body}</Typography>
                                </MuiGrid>
                            </Card>
                        </MuiGrid>
                    ))
                ) : null}
            </MuiGrid>
        </>
    );
}

export default UserDetail;