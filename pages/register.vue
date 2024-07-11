<template>
    <v-container>
        <v-row class="d-flex justify-center">
            <v-col cols="12" md="4">
                <v-card>
                    <v-card-title class="headline">Register</v-card-title>
                    <v-card-text>
                        <v-form>
                            <v-text-field v-model="email" label="Email" required />
                            <v-text-field v-model="password" label="Password" type="password" required />
                        </v-form>
                    </v-card-text>
                    <v-card-actions class="d-flex justify-end">
                        <v-btn color="primary" to="/register">Register</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
.headline {
  font-weight: bold;
}
</style>