/**
 * Copyright 2020 The Magma Authors.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import type {DialogProps} from './OrganizationDialog';

import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Collapse from '@mui/material/Collapse';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import React from 'react';
import Select from '@mui/material/Select';

import {AltFormField} from '../../components/FormField';
import {SSOSelectedType} from '../../../shared/types/auth';
import {useState} from 'react';

const ENABLE_ALL_NETWORKS_HELPER =
  'By checking this, the organization will have access to all existing and future networks.';

/**
 * Create Organization Tab
 * This component displays a form used to create an organization
 */
export default function (props: DialogProps) {
  const {
    organization,
    allNetworks,
    shouldEnableAllNetworks,
    setShouldEnableAllNetworks,
    hideAdvancedFields,
  } = props;
  const [open, setOpen] = useState(false);
  return (
    <List>
      {props.error && (
        <AltFormField label={''}>
          <FormLabel data-testid="organizationError" error>
            {props.error}
          </FormLabel>
        </AltFormField>
      )}
      <AltFormField label={'Organization Name'}>
        <OutlinedInput
          disabled={!!props.organization.id}
          data-testid="name"
          placeholder="Organization Name"
          fullWidth={true}
          value={organization.name || ''}
          onChange={({target}) => {
            props.onOrganizationChange({...organization, name: target.value});
          }}
        />
      </AltFormField>
      <ListItem disableGutters={true}>
        <Button
          variant="text"
          color="primary"
          onClick={() => {
            setOpen(!open);
          }}>
          Advanced Settings
        </Button>
        <ArrowDropDown />
      </ListItem>
      <Collapse in={open}>
        {!shouldEnableAllNetworks && (
          <AltFormField
            label={'Accessible Networks'}
            subLabel={'The networks that the organization have access to'}>
            <Select
              fullWidth={true}
              variant={'outlined'}
              multiple={true}
              renderValue={selected => selected.join(', ')}
              value={organization.networkIDs || []}
              onChange={({target}) => {
                props.onOrganizationChange({
                  ...organization,
                  networkIDs: [...(target.value as Array<string>)],
                });
              }}
              input={<OutlinedInput data-testid="organizationNetworks" />}>
              {allNetworks.map(network => (
                <MenuItem key={network} value={network}>
                  <ListItemText primary={network} />
                </MenuItem>
              ))}
            </Select>
          </AltFormField>
        )}
        <FormControlLabel
          label={'Give this organization access to all networks'}
          control={
            <Checkbox
              checked={shouldEnableAllNetworks}
              onChange={() =>
                setShouldEnableAllNetworks(!shouldEnableAllNetworks)
              }
            />
          }
        />
        <FormHelperText>{ENABLE_ALL_NETWORKS_HELPER}</FormHelperText>

        {!hideAdvancedFields && (
          <>
            <AltFormField label={'Single Sign-On'}>
              <Select
                fullWidth={true}
                variant={'outlined'}
                value={organization.ssoSelectedType || 'none'}
                onChange={({target}) => {
                  props.onOrganizationChange({
                    ...organization,
                    ssoSelectedType: target.value as SSOSelectedType,
                  });
                }}
                input={<OutlinedInput id="direction" />}>
                <MenuItem key={'none'} value={'none'}>
                  <ListItemText primary={'Disabled'} />
                </MenuItem>
                <MenuItem key={'oidc'} value={'oidc'}>
                  <ListItemText primary={'OpenID Connect'} />
                </MenuItem>
                <MenuItem key={'saml'} value={'saml'}>
                  <ListItemText primary={'SAML'} />
                </MenuItem>
              </Select>
            </AltFormField>

            {organization.ssoSelectedType === 'saml' ? (
              <>
                <AltFormField label={'Issuer'}>
                  <OutlinedInput
                    data-testid="issuer"
                    placeholder="Issuer"
                    fullWidth={true}
                    value={organization.ssoIssuer || ''}
                    onChange={({target}) => {
                      props.onOrganizationChange({
                        ...organization,
                        ssoIssuer: target.value,
                      });
                    }}
                  />
                </AltFormField>

                <AltFormField label={'Entrypoint'}>
                  <OutlinedInput
                    data-testid="entrypoint"
                    placeholder="Entrypoint"
                    fullWidth={true}
                    value={organization.ssoEntrypoint || ''}
                    onChange={({target}) => {
                      props.onOrganizationChange({
                        ...organization,
                        ssoEntrypoint: target.value,
                      });
                    }}
                  />
                </AltFormField>

                <AltFormField label={'Certificate'}>
                  <OutlinedInput
                    data-testid="Certificate"
                    placeholder="Certificate"
                    fullWidth={true}
                    value={organization.ssoCert || ''}
                    onChange={({target}) => {
                      props.onOrganizationChange({
                        ...organization,
                        ssoCert: target.value,
                      });
                    }}
                  />
                </AltFormField>
              </>
            ) : null}
            {organization.ssoSelectedType === 'oidc' ? (
              <>
                <AltFormField label={'Client ID'}>
                  <OutlinedInput
                    data-testid="ClientID"
                    placeholder="Client ID"
                    fullWidth={true}
                    value={organization.ssoOidcClientID || ''}
                    onChange={({target}) => {
                      props.onOrganizationChange({
                        ...organization,
                        ssoOidcClientID: target.value,
                      });
                    }}
                  />
                </AltFormField>

                <AltFormField label={'Client Secret'}>
                  <OutlinedInput
                    data-testid="ClientSecret"
                    placeholder="ClientSecret"
                    fullWidth={true}
                    value={organization.ssoOidcClientSecret || ''}
                    onChange={({target}) => {
                      props.onOrganizationChange({
                        ...organization,
                        ssoOidcClientSecret: target.value,
                      });
                    }}
                  />
                </AltFormField>

                <AltFormField label={'Configuration URL'}>
                  <OutlinedInput
                    data-testid="Configuration URL"
                    placeholder="Configuration URL"
                    fullWidth={true}
                    value={organization.ssoOidcConfigurationURL || ''}
                    onChange={({target}) => {
                      props.onOrganizationChange({
                        ...organization,
                        ssoOidcConfigurationURL: target.value,
                      });
                    }}
                  />
                </AltFormField>
              </>
            ) : null}
          </>
        )}
      </Collapse>
    </List>
  );
}
