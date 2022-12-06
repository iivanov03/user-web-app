import { useState, useEffect } from 'react';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import MuiGrid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TableRow, TableBody, Table, TableContainer, TableHead, Collapse, Paper, Box, Typography, FormGroup } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { User } from "../../types/user/User";
import { getUserList, editUser } from "../../redux/slice/user.slice";
import { RootState, AppDispatch } from "../../redux/slice/store";
import CircularProgress from '@mui/material/CircularProgress';
import TextInput from '../../components/TextInput';

const UserList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { userList, loadingUsers } = useSelector((state: RootState) => state.users);
    const [userFields, setUserFields] = useState<any>({});

    useEffect(() => {
        dispatch(getUserList())
            .then((res) => {
                const newValues = { ...userFields };
                res.payload.map((user: any) => {
                    newValues[user.id] = newValues[user.id] || [];
                    newValues[user.id].push(user);
                })
                setUserFields(newValues)
            })

    }, []);


    const Row = (props: { user: User, index: number }) => {
        const { user } = props;
        const [open, setOpen] = useState(false);


        const handleSave = (e: any, id: number) => {
            e.preventDefault();

            const newUserObj = {
                id: id,
                username: e.target.username.value,
                email: e.target.email.value,
                phone: e.target.phone.value,
                address: {
                    street: e.target.street.value,
                    suite: e.target.suite.value,
                    city: e.target.city.value
                }
            }
            dispatch(editUser(newUserObj))
                .then((res) => {
                    if (res.payload) {
                        const updatedUsers = {
                            id: id,
                            username: res.payload.username,
                            email: res.payload.email,
                            phone: res.payload.phone,
                            address: {
                                street: res.payload.address.street,
                                suite: res.payload.address.suite,
                                city: res.payload.address.city
                            }
                        }
                        let updatedUserObj = { ...userFields };
                        const userData = updatedUserObj[id][0];
                        updatedUserObj[id][0] = { ...userData, ...updatedUsers };
                        setUserFields(updatedUserObj);
                    }
                })
        }

        const handleCancel = (e: any) => {
            e.stopPropagetion()
            setOpen(false)
        }

        const handleChange = (e: any) => {
            e.stopPropagetion()
        }


        return (
            <>
                {
                    userFields[user.id]?.length ?
                        <>
                            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                                <TableCell>
                                    <IconButton
                                        aria-label="expand row"
                                        size="small"
                                        onClick={(e) => {
                                            setOpen(!open)
                                        }}
                                    >
                                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                    </IconButton>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {user.id}
                                </TableCell>
                                <TableCell align="right">{userFields[user.id][0].username}</TableCell>
                                <TableCell align="right">{userFields[user.id][0].email}</TableCell>
                                <TableCell align="right">{userFields[user.id][0].phone}</TableCell>
                                <TableCell align="right">{userFields[user.id][0].address.city}</TableCell>
                                <TableCell align="right">
                                    <Link to={`/user/${user.id}`}>
                                        <Button>
                                            <VisibilityIcon />
                                        </Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                    <Collapse in={open} timeout="auto" unmountOnExit>
                                        <Box sx={{ margin: 1 }}>
                                            <Typography variant="h6" gutterBottom component="div">
                                                Edit user
                                            </Typography>
                                            <form onSubmit={(e) => handleSave(e, user.id)}>
                                                <MuiGrid container spacing={3}>
                                                    <MuiGrid item xs={4}>
                                                        <FormGroup>
                                                            <TextInput
                                                                type="text"
                                                                margin="normal"
                                                                name="username"
                                                                label="Username"
                                                                defaultValue={userFields[user.id]?.length ? userFields[user.id][0].username : ''}
                                                                onChange={(e: any) => handleChange(e)}
                                                                required
                                                            />
                                                            <TextInput
                                                                type="email"
                                                                margin="normal"
                                                                name="email"
                                                                label="Email"
                                                                defaultValue={userFields[user.id][0].email || ''}
                                                                onChange={(e: any) => handleChange(e)}
                                                                required
                                                                pattern="\S+@\S+\.\S+"
                                                            />
                                                        </FormGroup>
                                                    </MuiGrid>
                                                    <MuiGrid item xs={4}>
                                                        <FormGroup>
                                                            <TextInput
                                                                type="text"
                                                                margin="normal"
                                                                name="phone"
                                                                label="Phone"
                                                                defaultValue={userFields[user.id]?.length ? userFields[user.id][0].phone : ''}
                                                                onChange={(e: any) => handleChange(e)}
                                                                required
                                                            />
                                                            <TextInput
                                                                type="text"
                                                                margin="normal"
                                                                name="city"
                                                                label="City"
                                                                defaultValue={userFields[user.id]?.length ? userFields[user.id][0].address.city : ''}
                                                                onChange={(e: any) => handleChange(e)}
                                                                required
                                                            />
                                                        </FormGroup>
                                                    </MuiGrid>
                                                    <MuiGrid item xs={4}>
                                                        <FormGroup>
                                                            <TextInput
                                                                type="text"
                                                                margin="normal"
                                                                name="street"
                                                                label="Street"
                                                                defaultValue={userFields[user.id]?.length ? userFields[user.id][0].address.street : ''}
                                                                onChange={(e: any) => handleChange(e)}
                                                            />
                                                            <TextInput
                                                                type="text"
                                                                margin="normal"
                                                                name="suite"
                                                                label="Suite"
                                                                defaultValue={userFields[user.id]?.length ? userFields[user.id][0].address.suite : ''}
                                                                onChange={(e: any) => handleChange(e)}
                                                            />
                                                        </FormGroup>
                                                    </MuiGrid>
                                                    <MuiGrid item xs={12}>
                                                        <MuiGrid container spacing={3} justifyContent="flex-end">
                                                            <MuiGrid item>
                                                                <Button type="submit" variant="text" color="primary">
                                                                    Save
                                                                </Button>
                                                            </MuiGrid>
                                                            <MuiGrid item>
                                                                <Button color="secondary" onClick={handleCancel}>
                                                                    Cancel
                                                                </Button>
                                                            </MuiGrid>
                                                        </MuiGrid>
                                                    </MuiGrid>
                                                </MuiGrid>
                                            </form>
                                        </Box>
                                    </Collapse>
                                </TableCell>
                            </TableRow>
                        </>
                        :
                        null
                }
            </>
        );
    }

    return loadingUsers ? (
        <MuiGrid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            <CircularProgress />
        </MuiGrid>
    ) : (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>ID</TableCell>
                        <TableCell align="right">Username</TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">Phone</TableCell>
                        <TableCell align="right">City</TableCell>
                        <TableCell align="right">See posts</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {userList.map((user, index) => (
                        <Row key={user.id} user={user} index={index} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default UserList;