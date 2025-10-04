<script setup>
import VerticalNavSectionTitle from '@/@layouts/components/VerticalNavSectionTitle.vue'
import VerticalNavGroup from '@/@layouts/components/VerticalNavGroup.vue'
import VerticalNavLink from '@/@layouts/components/VerticalNavLink.vue'
</script>

<template>
  <!-- 👉 Dashboards -->
  <VerticalNavGroup
    :item="{
      title: 'Dashboards',
      badgeContent: '5',
      badgeClass: 'bg-error',
      icon: 'ri-home-smile-line',
    }"
  >
    <VerticalNavLink
      :item="{
        title: 'Analytics',
        to: '/dashboard',
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Products',
        to: '/products',
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'ECommerce',
        href: '#',
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Academy',
        href: '#',
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Logistics',
        href: '#',
      }"
    />
  </VerticalNavGroup>

  <!-- 👉 Front Pages -->
  <VerticalNavGroup
    :item="{
      title: 'Front Pages',
      icon: 'ri-file-copy-line',
    }"
  >
    <VerticalNavLink
      :item="{
        title: 'Landing',
        to: '/',
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Pricing',
        href: '#',
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Payment',
        href: '#',
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Pricing',
        href: '#',
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Payment',
        href: '#',
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Checkout',
        href: '#',
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Help Center',
        href: '#',
      }"
    />
  </VerticalNavGroup>

  <!-- 👉 Apps & Pages -->
  <VerticalNavSectionTitle
    :item="{
      heading: 'Apps & Pages',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Email',
      icon: 'ri-mail-line',
      href: '#',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Chat',
      icon: 'ri-wechat-line',
      href: '#',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Calendar',
      icon: 'ri-calendar-line',
      href: '#',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Kanban',
      icon: 'ri-drag-drop-line',
      href: '#',
    }"
  />

  <VerticalNavLink
    :item="{
      title: 'Account Settings',
      icon: 'ri-user-settings-line',
      to: '/account-settings',
    }"
  />

  <VerticalNavLink
    :item="{
      title: 'Login',
      icon: 'ri-login-box-line',
      to: '/login',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Register',
      icon: 'ri-user-add-line',
      to: '/register',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Error',
      icon: 'ri-information-line',
      to: '/no-existence',
    }"
  />

  <!-- 👉 User Interface -->
  <VerticalNavSectionTitle
    :item="{
      heading: 'User Interface',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Typography',
      icon: 'ri-text',
      to: '/typography',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Icons',
      icon: 'ri-remixicon-line',
      to: '/icons',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Cards',
      icon: 'ri-bar-chart-box-line',
      to: '/cards',
    }"
  />

  <!-- 👉 Forms & Tables -->
  <VerticalNavSectionTitle
    :item="{
      heading: 'Forms & Tables',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Form Layouts',
      icon: 'ri-layout-4-line',
      to: '/form-layouts',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Form Validation',
      icon: 'ri-checkbox-multiple-line',
      href: '#',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Form Wizard',
      icon: 'ri-git-commit-line',
      href: '#',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Tables',
      icon: 'ri-table-alt-line',
      to: '/tables',
    }"
  />

  <!-- 👉 Others -->
  <VerticalNavSectionTitle
    :item="{
      heading: 'Others',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Access Control',
      icon: 'ri-shield-line',
      href: '#',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Documentation',
      icon: 'ri-article-line',
      href: '#',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Raise Support',
      href: '#',
      icon: 'ri-lifebuoy-line',
    }"
  />
</template>
