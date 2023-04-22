<template>
    <nav class="navbar navbar-light" style="background-color: #e3f2fd;">
        <span class="navbar-brand font-weight-bold">Ứng dụng quản lý ghi chú</span>
        <div class="mr-auto navbar-nav mb-lg-0">
            <li>
                <router-link :to="{ name: 'notebook' }" class="nav-link font-weight-bold">
                    <i class="fa-solid fa-note-sticky fa-bounce"></i>
                    Ghi chú
                </router-link>
            </li>
        </div>
        <div class="mr-auto navbar-nav mb-lg-0">
            <li>
                <router-link :to="{ name: 'contactbook' }" class="nav-link font-weight-bold">
                    <i class="fa-solid fa-address-book fa-bounce"></i>
                Liên hệ
                </router-link>
            </li>
        </div>
    </nav>
</template>