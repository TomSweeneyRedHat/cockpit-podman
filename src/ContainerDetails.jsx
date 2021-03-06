import React from 'react';
import cockpit from 'cockpit';
import * as util from './util.js';

const moment = require('moment');
const _ = cockpit.gettext;

const render_container_state = (container) => {
    if (container.status === "running") {
        return cockpit.format(_("Up since $0"), moment(container.createdat, util.GOLANG_TIME_FORMAT).calendar());
    }
    return cockpit.format(_("Exited"));
};

const render_container_published_ports = ({ ports }) => {
    let result = [];
    if (!ports)
        return result;
    for (let i = 0; i < ports.length; ++i)
        result.push(
            <React.Fragment key={ ports[i].protocol + ports[i].host_port + ports[i].container_port }>
                { ports[i].host_ip || '0.0.0.0' }:{ ports[i].host_port } &rarr; { ports[i].container_port }/{ ports[i].protocol }{ i < ports.length - 1 && ', ' }
            </React.Fragment>);
    return result;
};

const ContainerDetails = ({ container }) => (
    <div className='listing-ct-body'>
        <dl>
            <dt>{_("ID")}</dt>
            <dd>{container.id}</dd>
            <dt>{_("Created")}</dt>
            <dd>{moment(container.createdat, util.GOLANG_TIME_FORMAT).calendar()}</dd>
            <dt>{_("Image")}</dt>
            <dd>{container.image}</dd>
            <dt>{_("Command")}</dt>
            <dd>{container.command ? container.command.join(" ") : ""}</dd>
            <dt>{_("State")}</dt>
            <dd>{render_container_state(container)}</dd>
            <dt>{_("Ports")}</dt>
            <dd>{render_container_published_ports(container)}</dd>
        </dl>
    </div>
);

export default ContainerDetails;
