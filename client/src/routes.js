/* eslint-disable function-paren-newline */
/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { lazy, Suspense, Fragment } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useMediaQuery } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { logout } from 'src/actions';
import AuthLayout from 'src/layouts/Auth';
import ErrorLayout from 'src/layouts/Error';
import DashboardLayout from 'src/layouts/Dashboard';
import AuthGuard from 'src/components/AuthGuard';
import { useQuery, retryLoader } from 'src/utils/helper';
import Route from './Route';
import { initAPM } from './utils/elasitcAPM';

const UnderMaintenance = lazy(() =>
  retryLoader(() => import('src/views/UnderMaintenance')),
);

const routesConfig = [
  {
    path: '/',
    exact: true,
  },
  {
    path: '/under-maintenance',
    exact: true,
    component: lazy(() =>
      retryLoader(() => import('src/views/UnderMaintenance')),
    ),
  },
  {
    path: '/auth',
    layout: AuthLayout,
    routes: [
      {
        path: '/auth/login',
        exact: true,
        component: lazy(() => retryLoader(() => import('src/views/Login'))),
      },
      {
        path: '/auth/register-phone',
        exact: true,
        component: lazy(() =>
          retryLoader(() => import('src/views/auth/RegisterPhone')),
        ),
      },
      {
        path: '/auth/login-poplite',
        exact: true,
        component: lazy(() => retryLoader(() => import('src/views/Login'))),
      },
      {
        path: '/auth/register-poplite',
        exact: true,
        component: lazy(() =>
          retryLoader(() => import('src/views/RegisterPoplite')),
        ),
      },
      {
        path: '/auth/register/confirm-otp-sms',
        exact: true,
        component: lazy(() =>
          retryLoader(() => import('src/views/OtpConfirmation')),
        ),
      },
      {
        path: '/auth/register/confirm-otp-email',
        exact: true,
        component: lazy(() =>
          retryLoader(() => import('src/views/OtpConfirmation')),
        ),
      },
      {
        path: '/auth/register/referral-code',
        exact: true,
        component: lazy(() =>
          retryLoader(() => import('src/views/OtpConfirmation/ReferralCode')),
        ),
      },
      {
        path: '/auth/forgot',
        exact: true,
        component: lazy(() =>
          retryLoader(
            () => import('src/views/auth/ForgotPassword/SendVerificationCode'),
          ),
        ),
      },
      {
        path: '/auth/forgot/new-password',
        exact: true,
        component: lazy(() =>
          retryLoader(
            () => import('src/views/auth/ForgotPassword/NewPassword'),
          ),
        ),
      },
      {
        path: '/auth/callback',
        exact: true,
        component: lazy(() =>
          retryLoader(() => import('src/views/auth/AuthCallback')),
        ),
      },
      {
        path: '/auth/poplite-services',
        exact: true,
        component: lazy(() =>
          retryLoader(() => import('src/views/auth/PopliteFeatureSelection')),
        ),
      },
      {
        component: () => <Redirect to="/errors/404" />,
      },
    ],
  },
  {
    path: '/errors',
    layout: ErrorLayout,
    routes: [
      {
        path: '/errors/401',
        exact: true,
        component: lazy(() => retryLoader(() => import('@/views/errors/401'))),
      },
      {
        path: '/errors/404',
        exact: true,
        component: lazy(() => retryLoader(() => import('views/errors/404'))),
      },
      {
        path: '/errors/500',
        exact: true,
        component: lazy(() => retryLoader(() => import('views/errors/500'))),
      },
      {
        path: '/errors/block-access',
        exact: true,
        component: lazy(() =>
          retryLoader(() => import('src/views/MobileBlockAccess')),
        ),
      },
      {
        component: () => <Redirect to="/errors/404" />,
      },
    ],
  },
  {
    path: '/profile',
    guard: AuthGuard,
    layout: DashboardLayout,
    routes: [
      {
        path: '/profile/general',
        allowedRoles: [ADMIN, RESEARCHER],
        exact: true,
        component: lazy(() =>
          retryLoader(() => import('src/views/Profile/General')),
        ),
      },
      {
        path: '/profile/security',
        allowedRoles: [ADMIN, RESEARCHER],
        exact: true,
        component: lazy(() =>
          retryLoader(() => import('src/views/Profile/Security')),
        ),
      },
      {
        path: '/profile/:id',
        allowedRoles: [ADMIN, RESEARCHER],
        exact: true,
        component: lazy(() => retryLoader(() => import('src/views/Profile'))),
      },
      {
        path: '/profile/:id/:tab',
        allowedRoles: [ADMIN, RESEARCHER],
        exact: true,
        component: lazy(() => retryLoader(() => import('src/views/Profile'))),
      },
      {
        component: () => <Redirect to="/errors/404" />,
      },
    ],
  },
  {
    path: '*',
    guard: AuthGuard,
    layout: DashboardLayout,
    routes: [
      {
        path: '/panel-explorer',
        allowedRoles: [ADMIN],
        exact: true,
        component: lazy(() =>
          retryLoader(() => import('src/views/PanelExplorerDashboard')),
        ),
      },
      {
        path: '/panel-book',
        allowedRoles: [ADMIN, RESEARCHER, GUEST],
        exact: true,
        component: lazy(() => retryLoader(() => import('src/views/PanelBook'))),
      },
      {
        component: () => <Redirect to="/errors/404" />,
      },
    ],
  },
];

const isUserAllowedToAccess = (allowedRoles, userRoles) => {
  const isAllowedToAccess = allowedRoles.some((allowedRole) =>
    userRoles.includes(allowedRole),
  );
  return isAllowedToAccess;
};

function renderRoutes(
  routes,
  user,
  underMaintenance,
  popliteSignup,
  isCxToolsFeature,
  isMobile,
) {
  return routes ? (
    <Suspense
      fallback={
        <div style={{ width: '100%', textAlign: 'center', marginTop: 64 }}>
          <CircularProgress />
        </div>
      }
    >
      <Switch>
        <Route path="/under-maintenance" exact component={UnderMaintenance} />
        {underMaintenance && <Redirect to="/under-maintenance" />}
        {routes.map((route, index) => {
          const RouteGuard = route.guard || Fragment;
          const Layout = route.layout || Fragment;
          const Component = route.component;
          const RouteRoutes = route.routes;
          const { allowedRoles } = route;
          const { roles } = user || [];
          const isPoplite = roles?.length > 0 && roles?.includes(POPLITE);
          const mobileBlockRoutes = [
            '/poplite/studies/create',
            '/poplite/studies/:studyGroupId/edit',
            '/poplite/cx-tools/survey/create',
            '/poplite/cx-tools/survey/nps/create',
          ];

          if (isMobile && mobileBlockRoutes.includes(route.path)) {
            return (
              <Redirect
                key={route.path}
                from={route.path}
                to="/poplite/errors/block-access"
              />
            );
          }

          if (
            allowedRoles &&
            user &&
            !isUserAllowedToAccess(allowedRoles, roles)
          ) {
            return (
              <Redirect key={route.path} from={route.path} to="/errors/404" />
            );
          }

          if (
            popliteSignup === false &&
            route.path === '/auth/register-poplite'
          ) {
            return (
              <Redirect key={route.path} from={route.path} to="/auth/login" />
            );
          }

          return (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              render={(props) => {
                if (route.path === '/' && !user) {
                  return <Redirect to="/auth/login" />;
                }
                if (
                  route.path === '/' &&
                  user &&
                  !user.roles.includes('retailAuditQC')
                ) {
                  const popliteRedirect =
                    isCxToolsFeature || user?.isPopliteCxTools
                      ? '/poplite/cx-tools/survey'
                      : '/poplite/projects';
                  const redirectUrl = isPoplite
                    ? popliteRedirect
                    : '/projects/browse';

                  return <Redirect to={redirectUrl} />;
                }
                return (
                  <RouteGuard>
                    <Layout>
                      {RouteRoutes &&
                        renderRoutes(
                          RouteRoutes,
                          user,
                          underMaintenance,
                          popliteSignup,
                          isCxToolsFeature,
                          isMobile,
                        )}

                      {!RouteRoutes && <Component {...props} />}
                    </Layout>
                  </RouteGuard>
                );
              }}
            />
          );
        })}
      </Switch>
    </Suspense>
  ) : null;
}

const Routes = () => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('xs'), {
    noSsr: true,
  });
  const user = useSelector(
    (state) => state && state.session && state.session.user,
  );
  const isCxToolsFeature = useSelector(
    (state) => state.popliteDrawer?.isCxToolsFeature,
  );
  const underMaintenance = useSelector(
    (state) => state?.featureFlag?.underMaintenance?.isActive,
  );
  const popliteSignup = useSelector(
    (state) => state?.featureFlag?.popliteSignup?.isActive,
  );

  const elasticAPM = useSelector(
    (state) => state?.featureFlag?.elasticAPM?.isActive,
  );

  if (elasticAPM) {
    initAPM(elasticAPM);
  }

  const query = useQuery();
  const ref = query.get('ref');

  if (ref !== null) {
    const referralCode = ref.replace(/[^A-Za-z0-9]/g, '').substr(0, 64);
    if (referralCode.length > 0) {
      sessionStorage.setItem('referralCode', referralCode);
    } else {
      sessionStorage.removeItem('referralCode');
    }
  }

  if (user && !user.roles) {
    dispatch(logout());
    return <Redirect to="/auth/login" />;
  }

  return renderRoutes(
    routesConfig,
    user,
    underMaintenance,
    popliteSignup,
    isCxToolsFeature,
    isMobile,
  );
};

export default Routes;
