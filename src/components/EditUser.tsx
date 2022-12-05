import { useState } from "react";
import { Button, TextField } from "@mui/material";
import { styled } from '@mui/material/styles';
import MuiGrid from '@mui/material/Grid';

const Container = styled("div")({
    margin: 10
})

const EditUser = ({ fullName, phone, username, email, company, companyCatchPhrase, city, street, suite, zipcode, id, onEdit }: any) => {
    const [isEdit, setIsEdit] = useState(false);
    const handleEdit = () => {
        setIsEdit(!isEdit);
    };


    const handleOnEditSubmit = (e: any) => {
        e.preventDefault();
        onEdit(id, e.target.fullName.value, e.target.phone.value, e.target.username.value, e.target.email.value, e.target.company.value, e.target.companyCatchPhrase.value, e.target.city.value, e.target.street.value, e.target.suite.value, e.target.zipcode.value)
        setIsEdit(!isEdit);
    };

    return (
        <Container>
            {isEdit ? (
                <form onSubmit={handleOnEditSubmit}>
                    <MuiGrid container spacing={1}>
                        <MuiGrid item xs={12}>
                            <TextField
                                label="Name"
                                name="fullName"
                                defaultValue={fullName}
                                margin={"normal"}
                            />
                            <TextField
                                label="Username"
                                name="username"
                                defaultValue={username}
                                margin={"normal"}
                            />
                            <TextField
                                label="Phone"
                                name="phone"
                                defaultValue={phone}
                                margin={"normal"}
                            />
                            <TextField
                                label="Email"
                                name="email"
                                defaultValue={email}
                                margin={"normal"}
                            />
                            <TextField
                                label="City"
                                name="city"
                                defaultValue={city}
                                margin={"normal"}
                            />
                        </MuiGrid>
                        <MuiGrid item xs={12}>
                            <TextField
                                label="Street"
                                name="street"
                                defaultValue={street}
                                margin={"normal"}
                            />
                            <TextField
                                label="Suite"
                                name="suite"
                                defaultValue={suite}
                                margin={"normal"}
                            />
                            <TextField
                                label="Zipcode"
                                name="zipcode"
                                defaultValue={zipcode}
                                margin={"normal"}
                            />
                            <TextField
                                label="Company"
                                name="company"
                                defaultValue={company}
                                margin={"normal"}
                            />
                            <TextField
                                label="Company catch phrase"
                                name="companyCatchPhrase"
                                defaultValue={companyCatchPhrase}
                                margin={"normal"}
                            />
                        </MuiGrid>
                    </MuiGrid>
                    <MuiGrid item xs={12}>
                        <MuiGrid container spacing={3} justifyContent="flex-start">
                            <MuiGrid item>
                                <Button
                                    type="submit"
                                    color="primary"
                                    variant="contained"
                                >
                                    Save
                                </Button>
                            </MuiGrid>
                            <MuiGrid item>
                                <Button color="secondary" onClick={handleEdit} variant="contained">
                                    Cancel
                                </Button>
                            </MuiGrid>
                        </MuiGrid>
                    </MuiGrid>
                </form>

            ) : (
                <>
                    <MuiGrid container spacing={2}>
                        <MuiGrid item xs={6} md={4}>
                            Name:
                        </MuiGrid>
                        <MuiGrid item xs={6} md={8}>
                            {fullName}
                        </MuiGrid>
                    </MuiGrid>
                    <MuiGrid container spacing={2}>
                        <MuiGrid item xs={6} md={4}>
                            Username:
                        </MuiGrid>
                        <MuiGrid item xs={6} md={8}>
                            {username}
                        </MuiGrid>
                    </MuiGrid>
                    <MuiGrid container spacing={2}>
                        <MuiGrid item xs={6} md={4}>
                            Phone:
                        </MuiGrid>
                        <MuiGrid item xs={6} md={8}>
                            {phone}
                        </MuiGrid>
                    </MuiGrid>
                    <MuiGrid container spacing={2}>
                        <MuiGrid item xs={6} md={4}>
                            Address:
                        </MuiGrid>
                        <MuiGrid item xs={6} md={8}>
                            {`${suite}, ${street}, ${city}, ${zipcode}`}
                        </MuiGrid>
                    </MuiGrid>
                    <MuiGrid container spacing={2}>
                        <MuiGrid item xs={6} md={4}>
                            Company:
                        </MuiGrid>
                        <MuiGrid item xs={6} md={8}>
                            {company}
                        </MuiGrid>
                    </MuiGrid>
                    <MuiGrid container spacing={2}>
                        <MuiGrid item xs={6} md={4}>
                            Company catchphrase:
                        </MuiGrid>
                        <MuiGrid item xs={6} md={8}>
                            {companyCatchPhrase}
                        </MuiGrid>
                    </MuiGrid>
                    <MuiGrid container margin={"normal"}>
                        <Button
                            onClick={handleEdit}
                            variant="contained"
                            color="primary"
                        >
                            Edit
                        </Button>
                    </MuiGrid>
                </>
            )}
        </Container>
    );
};

export default EditUser;