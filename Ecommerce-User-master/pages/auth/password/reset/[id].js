import { useState } from 'react';
import Layout from '../../../../components/layout/layout';
import { withRouter } from 'next/router';
import { resetPassword } from '../../../../actions/auth';

const ResetPassword = ({ router }) => {
    const [values, setValues] = useState({
        name: '',
        newPassword: '',
        showForm: true
    });

    const { showForm, name, newPassword, error, message } = values;

    const handleSubmit = e => {
        e.preventDefault();
        resetPassword({
            newPassword,
            reset_passwordLink: router.query.id
        }).then(data => {
            if (data.error) {
                setValues({ ...values, showForm: false, newPassword: '' });
            } else {
                setValues({ ...values, showForm: false, newPassword: '' });
            }
        });
    };

    const passwordResetForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group pt-5">
                <input
                    type="password"
                    onChange={e => setValues({ ...values, newPassword: e.target.value })}
                    className="form-control"
                    value={newPassword}
                    placeholder="Type new password"
                    required
                />
            </div>
            <div>
                <button className="btn btn-primary">Change password</button>
            </div>
        </form>
    );



    return (
        <Layout>
            <div className="container">
                <h2>Reset password</h2>
                <hr />
             {passwordResetForm()}
            </div>
        </Layout>
    );
};

export default withRouter(ResetPassword);
