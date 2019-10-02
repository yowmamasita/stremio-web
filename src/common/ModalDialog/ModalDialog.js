const React = require('react');
const PropTypes = require('prop-types');
const classnames = require('classnames');
const Button = require('stremio/common/Button');
const Icon = require('stremio-icons/dom');
const styles = require('./styles');

const ModalDialog = ({className, children, title, buttons, onClose}) => {
    return (
        <div className={classnames(styles['modal-dialog-container'], className)}>
            <Button onClick={onClose}>
                <Icon className={styles['x-icon']} icon={'ic_x'} />
            </Button>
            <h1>{title}</h1>
            <div className={styles['modal-dialog-content']}>
                {children}
            </div>
            <div className={styles['modal-dialog-buttons']}>
                {buttons ? buttons.map((button, key) => (
                    <Button key={key} className={styles['button']} {...button.props}>
                        {
                            button.icon
                            ?
                            <Icon className={styles['icon']} icon={button.icon} ></Icon>
                            :
                            null
                        }
                        {button.label}
                    </Button>
                )) : null}
            </div>
        </div>
    )
};

module.exports = ModalDialog;