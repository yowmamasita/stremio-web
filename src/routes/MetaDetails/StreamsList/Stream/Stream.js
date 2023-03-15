// Copyright (C) 2017-2022 Smart code 203358507

const React = require('react');
const PropTypes = require('prop-types');
const classnames = require('classnames');
const Icon = require('@stremio/stremio-icons/dom');
const { Button, Image, PlayIconCircleCentered, useToast } = require('stremio/common');
const StreamPlaceholder = require('./StreamPlaceholder');
const styles = require('./styles');
const { playViaDeepLink } = require('./external');

const Stream = ({ className, addonName, name, description, thumbnail, progress, deepLinks, ...props }) => {
    const href = React.useMemo(() => {
        return deepLinks ?
            playViaDeepLink('https://infuse.bensarmiento.workers.dev/?dl=https', deepLinks)
            :
            null;
    }, [deepLinks]);
    const renderThumbnailFallback = React.useCallback(() => (
        <Icon className={styles['placeholder-icon']} icon={'ic_broken_link'} />
    ), []);
    const toast = useToast();
    props.onClick = e => {
        e.preventDefault();
        fetch(href)
            .then(resp => {
                if (resp.status !== 200) {
                    throw new Error(`Request failed with status ${resp.status}: ${resp.statusText}`);
                }
                toast.show({
                    type: 'success',
                    title: 'Sent to Infuse',
                    timeout: 4000
                });
            })
            .catch(err => {
                toast.show({
                    type: 'error',
                    title: 'Fetch error',
                    message: err.message,
                    timeout: 4000,
                    dataset: {
                        type: 'CoreEvent'
                    }
                });
            })
    };
    return (
        <Button {...props} className={classnames(className, styles['stream-container'])} title={addonName}>
            {
                typeof thumbnail === 'string' && thumbnail.length > 0 ?
                    <div className={styles['thumbnail-container']} title={name || addonName}>
                        <Image
                            className={styles['thumbnail']}
                            src={thumbnail}
                            alt={' '}
                            renderFallback={renderThumbnailFallback}
                        />
                    </div>
                    :
                    <div className={styles['addon-name-container']} title={name || addonName}>
                        <div className={styles['addon-name']}>{name || addonName}</div>
                    </div>
            }
            <div className={styles['info-container']} title={description}>{description}</div>
            <PlayIconCircleCentered className={styles['play-icon']} />
            {
                progress !== null && !isNaN(progress) && progress > 0 ?
                    <div className={styles['progress-bar-container']}>
                        <div className={styles['progress-bar']} style={{ width: `${Math.min(progress, 1) * 100}%` }} />
                    </div>
                    :
                    null
            }
        </Button>
    );
};

Stream.Placeholder = StreamPlaceholder;

Stream.propTypes = {
    className: PropTypes.string,
    addonName: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    thumbnail: PropTypes.string,
    progress: PropTypes.number,
    deepLinks: PropTypes.shape({
        player: PropTypes.string
    })
};

module.exports = Stream;
