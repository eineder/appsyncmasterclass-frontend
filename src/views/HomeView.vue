<template>
  <div id="app" class="flex container h-screen w-full">
    <!-- side navigation -->
    <SideNav />

    <!-- tweets -->
    <template>
      <div class="w-full h-full overflow-y-scroll">
        <div class="w-full h-full overflow-y-scroll">
          <div class="px-5 py-3 border-b border-lighter flex items-center justify-between">
            <h1 class="text-xl font-bold">Home</h1>
            <i class="far fa-star text-xl text-blue"></i>
          </div>
          <div class="px-5 py-3 border-b-8 border-lighter flex">
            <div class="flex-none mr-4">
              <img :src="`${profile.imageUrl || 'default_profile.png'}`" class="flex-none w-12 h-12 rounded-full" />
            </div>
            <div class="w-full relative">
              <textarea v-model="tweet.text" placeholder="What's happening?"
                class="w-full focus:outline-none mt-3 pb-3"></textarea>
              <div>
                <i class="text-lg text-blue mr-4 far fa-image"></i>
                <i class="text-lg text-blue mr-4 fas fa-film"></i>
                <i class="text-lg text-blue mr-4 far fa-chart-bar"></i>
                <i class="text-lg text-blue mr-4 far fa-smile"></i>
              </div>
              <button @click="addNewTweet" type="button"
                class="h-10 px-4 text-white font-semibold bg-blue hover:bg-darkblue rounded-full absolute bottom-0 right-0"
                :class="`${this.tweet.text ? '' : ' opacity-50 cursor-not-allowed'
                  }`">
                Tweet
              </button>
            </div>
          </div>

          <!-- timeline -->
          <div v-if="tweets.length === 0" class="flex flex-col items-center justify-center w-full pt-10 px-6">
            <p class="font-bold text-lg">Welcome to Fitter!</p>
            <p class="text-sm text-dark text-center">
              This is the best place to see what’s happening in your world. Find
              some people and topics to follow now.
            </p>
            <button class="text-white bg-blue rounded-full font-semibold mt-4 px-4 py-2 hover:bg-darkblue">
              <p class="hidden lg:block">Let's go!</p>
              <i class="fas fa-plus lg:hidden"></i>
            </button>
          </div>

          <TweetsView />
        </div>
      </div>
    </template>

    <!-- default right bar -->
    <DefaultRightBar />
  </div>
</template>

<script>
import SideNav from "../components/SideNav";
import TweetsView from "../components/TweetsView";
import DefaultRightBar from "../components/DefaultRightBar";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "HomeView",
  data() {
    return {
      tweet: {
        text: "",
      },
    };
  },
  components: {
    SideNav,
    TweetsView,
    DefaultRightBar,
  },
  computed: {
    ...mapGetters('twitter', [
      'profile',
      'tweets',
    ]),
  },
  methods: {
    ...mapActions('authentication', [
      'loginUserIfAlreadyAuthenticated',
    ]),
    ...mapActions('twitter', [
      'createTweet',
    ]),
    async addNewTweet() {
      if (!this.tweet.text) return;
      await this.createTweet({
        text: this.tweet.text
      });
      this.tweet.text = ''
    },
  },
  async created() {
    await this.loginUserIfAlreadyAuthenticated();
  },
};
</script>

<style>
/* div {
  border: 1px dashed blue;
  padding: 15px;
}

div.items-center.justify-center {
  background-color: rgba(240, 240, 240, 0.5);
} */
</style>
